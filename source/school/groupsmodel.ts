

interface PupilSchema {
    name ? : {
        first ? : string,
        last ? : string
    },
    image ? : string,
    dateOfBirth ? : string, 
    phones ? : [{
        phone ? : string,
        primary: boolean
    }],
    sex ? : string,
    description ? : string
}

interface GroupSchema {
    id ?: string,
    room ? : number,
    level ? : number,
    pupils ? : Map<string, PupilSchema>
}
const id =  () => {return "A" + Math.floor(Math.random() * 100000000)};

export class GroupsModel {
    clear() {
        throw new Error("Method not implemented.");
    }
    groups: Map<string, GroupSchema>;
    pupils: Map<string, PupilSchema>;
    errorText: string;
    random: number;
    constructor(){
        this.groups = new Map();
        this.pupils = new Map();
        this.errorText = "We dont have this id in Base!"
        this.random = Math.floor(Math.random() * 100000000)
    }
    async add (room : number, level =1)
    {
        const id =  () => {return 'A' + this.random};
        var PrivID = id();
        var pupils = this.pupils;
        let group : GroupSchema = 
        {
            id: PrivID,
            room ,
            level ,
            pupils
        }
        this.groups.set(PrivID, group );
        return PrivID; 
    }

    deleteAll ()
    {
        this.groups.clear();
    }

    async addPupil(groupID :string, pupilID : object)
    {
        this.pupils.set(groupID,pupilID);
        var pupils = this.pupils
        var room = this.groups.get(groupID).room;
        var level = this.groups.get(groupID).level;
        let group : GroupSchema= {
            id: groupID,
            room ,
            level ,
            pupils
        };
        let oldData : GroupSchema = this.groups.get(groupID);
        this.groups.set(groupID,{...oldData, ...group});
    }

    async removePupil(groupID:string , pupilID : string)
    {
        if (typeof this.groups.get(groupID) == void 0 )
            return this.errorText
        else return this.groups.delete(pupilID);
    }

    async read (groupID : string )
    {
        if (typeof this.groups.get(groupID) !== void 0)
        {
            var room =  this.groups.get(groupID).room;
            var group = {
                groupID, room
            }
            return(group);
        }
        else throw new TypeError('void 0');
    }

    async update (PrivID : string ,object : object)
    {
        if ( this.groups.get(PrivID) == void 0)
        {
            throw new TypeError(this.errorText);
        }
        else
        {
            let current = this.groups.get(PrivID);
            this.groups.set(PrivID,{...current, ...object});
            return (PrivID)
        }
    }

    readAll()
    {
        return this.groups;
    }

}