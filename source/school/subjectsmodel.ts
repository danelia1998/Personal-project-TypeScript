
interface SubjectSchema {
    title ?: string ;
    lessons ?: number ; 
    description ?: string ;
}

export class SubjectsModel {
    subject: { title: string; lessons: number; description: string; };
    id: string;
    constructor(subject : SubjectSchema){
        const f =  () => {return "A" + Math.floor(Math.random() * 100000000)};
        this.id = (f()).toString();
        var title = subject.title;
        var lessons = subject.lessons;
        var description = subject.description
        this.subject = {
            title, lessons, description
        }
    }

}


