import { ValidatorModel } from "./validator"


interface emails {
    email: string,
    primary: boolean
}

interface phones {
    phone: string,
    primary: boolean
}

interface subjects {
    subject: string
}


interface SubjectSchema {
    name: {
        first: string,
        last: string
    },
    image: string,
    dateOfBirth: string, // format date
    emails?: emails[],
    phones?: phones[],
    sex: string, // male or female
    subjects?: subjects[],
    description: string,
}

export class PupilsModel {
    pupils: Map<string, SubjectSchema>;
    errorText: string;
    constructor() {
        this.pupils = new Map();
        this.errorText = "We dont have this id in Base!"
    }

    async add(pupil: SubjectSchema) {
        ValidatorModel.validator(pupil)
        const id = () => { return 'A' + Math.floor(Math.random() * 100000000)};
        var privateID = id();
        this.pupils.set(privateID, pupil);
        return privateID;
    }

    async read(id: string) {
        if (!this.pupils.get(id))
            throw new TypeError(this.errorText)
        else {
            var pupils = this.pupils.get(id);
            var obj = { id, ...pupils }
            return (obj);
        }
    }
    async remove(id: string) {
        if (this.pupils.get(id) == void 0)
            throw new TypeError('Invalid ID');
        else {
            this.pupils.delete(id);
            return (this.pupils.delete(id))
        }
    }

    async update (currentID:string , obj : SubjectSchema)
    { ValidatorModel.validator(obj)
      if ( this.pupils.get(currentID) == void 0)
        throw new TypeError(this.errorText);
      else
      {
        let current = this.pupils.get(currentID);
        this.pupils.set(currentID,{...current, ...obj});
      }
        return currentID
    }
}