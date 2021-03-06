import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {SelectItem} from '../../select.item';
import {AngularFireDatabase} from 'angularfire2/database';
import {SelectSource} from '../../select.source';
import {Character} from '../../character';
import {Clan} from '../../clan';
import {TranslateService} from '@ngx-translate/core';
import {specializations} from '../../specialization';
import {Tag} from '../../tag';
import {Predator} from "../../predator";
import { map } from "rxjs/operators";
import {DisciplineLevel, disciplineLevels} from "../../discipline.level";
import {Discipline} from "../../discipline";

@Component({
  selector: 'character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public attributeMin: number;
  public skillMin: number;
  public max: number;
  public formGroup: Observable<FormGroup>;
  @Input() public isStoryteller: boolean;
  @Input() public character: Observable<Character>;
  @Output() public save: EventEmitter<Character>;

  constructor(private formBuilder: FormBuilder,
              private translate: TranslateService,
              private database: AngularFireDatabase) {
    this.save = new EventEmitter();
    this.attributeMin = 1;
    this.skillMin = 0;
    this.max = 5;
  }

  public isOpen(formGroup: FormGroup): boolean {
    return formGroup.controls.isOpen.value || this.isStoryteller;
  }

  ngOnInit(): void {
    this.formGroup = this.character.pipe(map((c: Character) => {
      return this.formBuilder.group({
        name: [c.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        generation: [c.generation, [Validators.required, Validators.min(4), Validators.max(16)]],
        ownerId: c.ownerId,
        storytellerId: c.storytellerId,
        chronicleId: c.chronicleId,
        isOpen: c.isOpen,
        experience: c.experience,
        predator: c.predator,
        clan: c.clan,
        strength: c.strength,
        dexterity: c.dexterity,
        stamina: c.stamina,
        charisma: c.charisma,
        manipulation: c.manipulation,
        composure: c.composure,
        intelligence: c.intelligence,
        wits: c.wits,
        resolve: c.resolve,
        humanity: this.formBuilder.control(c.humanity),
        touchstones: c.touchstones,
        backgroundsAndMerits: c.backgroundsAndMerits,
        health: this.formBuilder.control(c.health),
        willpower: this.formBuilder.control(c.willpower),
        bloodPotency: c.bloodPotency,
        hunger: c.hunger,
        physical: this.formBuilder.group({
          athletics: c.physical.athletics,
          brawl: c.physical.brawl,
          crafts: c.physical.crafts,
          dodge: c.physical.dodge,
          drive: c.physical.drive,
          melee: c.physical.melee,
          security: c.physical.security,
          stealth: c.physical.stealth,
          survival: c.physical.survival
        }),
        social: this.formBuilder.group({
          animalKen: c.social.animalKen,
          empathy: c.social.empathy,
          etiquette: c.social.etiquette,
          intimidation: c.social.intimidation,
          leadership: c.social.leadership,
          performance: c.social.performance,
          persuasion: c.social.persuasion,
          streetwise: c.social.streetwise,
          subterfuge: c.social.subterfuge
        }),
        mental: this.formBuilder.group({
          academics: c.mental.academics,
          awareness: c.mental.awareness,
          firearms: c.mental.firearms,
          investigation: c.mental.investigation,
          linguistics: c.mental.linguistics,
          medicine: c.mental.medicine,
          occult: c.mental.occult,
          science: c.mental.science,
          technology: c.mental.technology
        }),
        specializations: this.formBuilder.control(c.specializations ? c.specializations : null),
        disciplineLevels: this.formBuilder.control(c.disciplineLevels ? c.disciplineLevels : null)
      });
    }));
  }

  private enumSelectSource(enumObject: any, useIndex: boolean): SelectSource {
    return (data: any, byKey: boolean): Observable<SelectItem[]> => {
      return Observable.create(s => {
        s.next(byKey ? [{ id: data, text: this.translate.instant(enumObject[data].toLowerCase()) }]
          : Object.keys(enumObject).map(index => {
            const key: string = enumObject[index];
            if (!isNaN(Number(key))) {
              return null;
            }
            const lowerKey = key.toLowerCase();
            return {
              id: useIndex ? Number(index) : lowerKey,
              text: <string> this.translate.instant(lowerKey)
            };
          }).filter(item => {
            return item && item.text.toLowerCase().indexOf(data) > -1;
          }).sort((l, r) => l.text > r.text ? 1 : (r.text > l.text ? -1 : 0)));
      });
    };
  }

  public get predators(): SelectSource {
    return this.enumSelectSource(Predator, true);
  }

  public get clans(): SelectSource {
    return this.enumSelectSource(Clan, true);
  }

  public get disciplineLevelsSource(): SelectSource {
    const transform = id => {
      const disciplineLevel: DisciplineLevel = disciplineLevels[id];
      return {
        id: id,
        text: `${this.translate.instant(Discipline[disciplineLevel.discipline].toLowerCase())} - ${this.translate.instant(id)} = ${disciplineLevel.level}`
      };
    };

    return this.transformSelectSource(transform, disciplineLevels);
  }

  public get specializationsSource(): SelectSource {
    const transform = id => {
      return {
        id: id,
        text: `${this.translate.instant(Tag[specializations[id]].toLowerCase())} - ${this.translate.instant(id)}`
      };
    };

    return this.transformSelectSource(transform, specializations);
  }

  private transformSelectSource(transform: (id: string) => any, options: {}): SelectSource {
    return (data: any, byKey: boolean): Observable<SelectItem[]> => {
      return Observable.create(s => {
        s.next(byKey
          ? (<string[]>data).map(transform)
          : Object.keys(options).map(transform).filter(item => {
            return item.text.toLowerCase().indexOf(data) > -1;
          }));
      });
    };
  }

  public get users(): SelectSource {
    return (data: any, byKey: boolean): Observable<SelectItem[]> => {
      return this.database.list('users', r => byKey
        ? r.orderByKey().equalTo(data)
        : r.orderByChild('name').startAt(data).endAt(`${data}\uf8ff`))
        .snapshotChanges().pipe(map(array => array.map(u => {
          return { id: u.payload.key, text: u.payload.val().name };
        })));
    };
  }

  public submit(character: Character): void {
    this.save.emit(character);
  }
}
