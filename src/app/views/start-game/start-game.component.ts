import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList, SnapshotAction} from 'angularfire2/database';
import {Blocker} from '../../blocker';
import {Router} from '@angular/router';
import {fromPromise} from '../../observable.extensions';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {map} from "rxjs/operators";

@Component({
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss'],
})
export class StartGameComponent {
  public formGroup: FormGroup;
  public myCharactersBlocker: Blocker;
  public myChroniclesBlocker: Blocker;
  public myCharacters: Observable<SnapshotAction[]>;
  public myChronicles: Observable<SnapshotAction[]>;
  private daoMyChronicles: AngularFireList<any>;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private database: AngularFireDatabase,
              private angularFireAuth: AngularFireAuth,
              private blocker: Blocker) {
    this.myCharactersBlocker = new Blocker();
    this.myChroniclesBlocker = new Blocker();
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
    this.daoMyChronicles = database.list('chronicles',
      r => r.orderByChild('ownerId').equalTo(this.angularFireAuth.auth.currentUser.uid));
    this.myCharacters = database.list('characters',
      r => r.orderByChild('ownerId').equalTo(this.angularFireAuth.auth.currentUser.uid))
      .snapshotChanges().pipe(this.myCharactersBlocker.toPipe(), map(array => array.filter(u => u.payload.val().storytellerId !== this.angularFireAuth.auth.currentUser.uid)));
    this.myChronicles = this.daoMyChronicles.snapshotChanges().pipe(this.myChroniclesBlocker.toPipe());
  }

  public createChronicle(): void {
    fromPromise(this.daoMyChronicles.push(Object.assign({ ownerId: this.angularFireAuth.auth.currentUser.uid }, this.formGroup.value)))
      .pipe(this.blocker.toPipe()).subscribe(r => this.router.navigate(['in/chronicle', r.key]));
  }

  public playCharacter(snapshotAction: SnapshotAction): void {
    this.router.navigate(['in/dice/player', snapshotAction.payload.val().chronicleId, snapshotAction.key]);
  }

  public playChronicle(snapshotAction: SnapshotAction): void {
    this.router.navigate(['in/dice/storyteller', snapshotAction.key]);
  }
}
