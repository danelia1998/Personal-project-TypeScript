import {ValidatorModel} from "./validator"

interface emails{
    email: string,
    primary: boolean
}

interface phones{
    phone: string,
    primary: boolean
}

interface subjects{
    subject: string
}



interface SubjectSchema {
    name: {
      first: string,
      last: string
    },
    image: string,
    dateOfBirth: string, // format date
    emails: emails[],
    phones: phones[],
    sex: string, // male or female
    subjects: subjects[],
    description: string,
  }

export class TeachersModel{
    tchr: Map<string, SubjectSchema>;
    errorText: string;
    random: number;
    constructor(){
        this.tchr = new Map();
        this.errorText = "We dont have this id in Base!"
        this.random = Math.floor(Math.random() * 100000000)
    }

    async add (teacher: SubjectSchema )
    {
      ValidatorModel.validator(teacher)
      var each = 'A' + this.random;
      this.tchr.set(each, teacher);
      return each;
    }

    async read (id : string)
    {
      if (!(this.tchr.get(id)))
          throw new TypeError(this.errorText)
      else {
          var tchr = this.tchr.get(id);
          var obj = { id , ...tchr }
          return obj ; 
      }
    }

    async update (currentID : string, obj : SubjectSchema  )
    { 
      ValidatorModel.validator(obj)
      if ( this.tchr.get(currentID) == void 0)
        throw new TypeError(this.errorText);
      else{
        let current = this.tchr.get(currentID);
        this.tchr.set(currentID,{...current, ...obj});
      }
        return currentID;
    }
    async remove(ID : string)
    {


        if ( this.tchr.get(ID) == void 0)
          throw new TypeError(this.errorText);
        else
          return this.tchr.delete(ID) ;
    }

    deleteAll ()
    {
      this.tchr.clear();
    }
}