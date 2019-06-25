import { GroupsModel } from "./GroupsModel";
import { TeachersModel } from "./TeachersModel";
import { LMSModel } from "./LMSModel";
import { SubjectsModel } from "./SubjectsModel";

interface pupil_schema {
    pupilid? : string
    name ? : {
      first ? : string,
      last ? : string
    },
    image ? : string,
    dateOfBirth ? : string, 
    phones ? : 
      {
        phone ? : string,
        primary: boolean
      }[],
    sex ? : string,
    description ? : string
  }

interface group_schema {
    id ?: string,
    room ? : number
    level ? : number
    pupils ? : Map<string,pupil_schema>
}

interface records 
    {
    pupilId ? : string,
    teacherId ? : string,
    subjectId ? : string,
    lesson ? : number,
    mark ? : number
}

interface gradebook_schema{
    gradebookid ? : string;
    groupid ?:  string;
    level ?: number;
    record ? : records ;
    pupilid ? : string;
}

interface subject_schema {
    title ?: string ;
    lessons ?: number ; 
    description ?: string ;
}



export class GradebooksModel{
    gradebook: Map<string, gradebook_schema>;
    mainbook: gradebook_schema[];
    groups: GroupsModel;
    teachers: TeachersModel;
    lms: LMSModel;
    id: string;

    constructor(groups : GroupsModel, teachers: TeachersModel, lms :LMSModel)
    {
        this.gradebook = new Map();
        this.mainbook = [];
        this.groups = groups;
        this.teachers = teachers;
        this.lms = lms;
        this.id = "";
    }

    async add(level : number, idgr : string){
        let newobj : gradebook_schema = {};
        this.id = "A" +Math.floor(Math.random() * 100000000)
        newobj.gradebookid = this.id;
        newobj.level = level;
        newobj.groupid = idgr;
        this.gradebook.set(this.id, newobj);
        return this.id;
    }

    async clear() {
        this.groups.deleteAll();
        this.teachers.deleteAll();
        this.lms.deleteAll();
    }

    async addRecord(gradebookId : string , record : records){
        let tchrID = record.teacherId;
        let subjectId = record.subjectId;
        let lesson = record.lesson;
        let mark = record.mark ;
        let temporary = this.groups.pupils.get(record.pupilId)
        let EachPupil = this.groups.pupils.get(record.pupilId)
        let FullName = `${EachPupil.name.first} ${EachPupil.name.last}`;
        let tchr = await this.teachers.read(tchrID);
        let tchrFullName =  `${tchr.name.first} ${tchr.name.last}`;
        let subject: subject_schema[] = await this.lms.readAll()
        let subjectTitle : string;
        for (var i = 0 ; i < subject.length ; i ++)
        {
            if ( record.lesson == subject[i].lessons)
                 subjectTitle = subject[i].title
        }
        let obj = {
            FullName,
            records: [ { tchrFullName,subjectTitle,lesson,mark } ]
        };
        
        let finalobj : gradebook_schema = {gradebookid: gradebookId, record , pupilid: record.pupilId};
        this.mainbook.push(finalobj);
    }

    async read(first : string , second : string ){
        for(let each = 0; each < this.mainbook.length; each++)
        {
            if(this.mainbook[each].gradebookid == first && this.mainbook[each].record.pupilId == second)
            {
                let temporary =  this.mainbook[each].record;
            }
        }
    }

    async readAll(mainid : string)
    {
        let result = [];
        for(let each=0; each<this.mainbook.length; each++)
        {
            if(this.mainbook[each].gradebookid == mainid)
            {
                result.push(this.mainbook[each].record);
            }
        }
        return result;
    }
}