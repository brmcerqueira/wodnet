declare const context: {
    physical: string[],
    social: string[],
    mental: string[]
}

enum ApplyType {
    HealthSuperficial,
    WillpowerSuperficial,
    HealthAggravated,
    WillpowerAggravated,
    Experience,
    Advantage,
    Flaw,
    SpecialtyPhysical,
    SpecialtySocial,
    SpecialtyMental,
}

function buildOptions(type: ApplyType): string {
    let result = "";

    let options: string[] = [];

    switch (type) {
        case ApplyType.SpecialtyPhysical:
            options = context.physical;
            break;
        case ApplyType.SpecialtySocial:
            options = context.social; 
            break;   
        case ApplyType.SpecialtyMental: 
            options = context.mental;
            break;
    }

    for (let index = 0; index < options.length; index++) {
        result += `<option value=${options[index]}>${options[index]}</option>`;
    }

    return result;
}

function typeChange(select: HTMLSelectElement): void {  
    const name = document.getElementById("name") as HTMLElement;
    const valueNumber = document.getElementById("valueNumber") as HTMLElement;
    const skill = document.getElementById("skill") as HTMLElement;
    const type = parseInt(select.value) as ApplyType;

    switch (type) {
        case ApplyType.HealthSuperficial:
        case ApplyType.HealthAggravated:
        case ApplyType.WillpowerSuperficial:
        case ApplyType.WillpowerAggravated:
        case ApplyType.Experience:
            name.hidden = true;
            valueNumber.hidden = false;
            skill.hidden = true;
          break;
        case ApplyType.Advantage:
        case ApplyType.Flaw:
            name.hidden = false;
            valueNumber.hidden = false;
            skill.hidden = true;
            break;
        case ApplyType.SpecialtyPhysical:
        case ApplyType.SpecialtySocial:    
        case ApplyType.SpecialtyMental: {
            name.hidden = false;
            valueNumber.hidden = true;
            skill.hidden = false;
            (document.getElementById("skillSelect") as HTMLSelectElement).innerHTML = buildOptions(type);
            break;
        }
    }
}