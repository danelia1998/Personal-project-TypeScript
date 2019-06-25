interface SubjectSchema {
    title?: string;
    lessons?: number;
    description?: string;
}


export class LMSModel {
    clear() {
        throw new Error("Method not implemented.");
    }
    data: Set<SubjectSchema>;
    constructor(){
        this.data = new Set<SubjectSchema>();
    }

    subject_schema: {
        title ?: string ;
        lessons ?: number ; 
        description ?: string ;
    }

    async add(subject : object)
    {
        this.data.add(subject);
        return 'Added';

    }
    async remove (subject :SubjectSchema)
    {
        if (this.data.has(subject))
            {
                let del = this.data.delete(subject);
                return 'Removed'
            }
        else throw new TypeError('Problem with removing');
    }

    deleteAll () {
        this.data.clear();
    }

    async verify (subject : {subject:SubjectSchema})
    {
        return this.data.has(subject.subject);
    }
    async readAll() {
        return Array.from(this.data)
    }
}

// return Array.from(this.data).map