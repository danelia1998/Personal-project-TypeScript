import {SubjectsModel,LMSModel,TeachersModel,PupilsModel,GroupsModel,GradebooksModel} from "./school"


(async () => {
  const history = new SubjectsModel({
    title: 'History',
    lessons: 24,
    description: "david"
  });

  const m = new SubjectsModel({
    title: 'm',
    lessons: 14
  });

  history.id

  const lms = new LMSModel();
  await lms.add(history);

  
  let data = {
    name: {
      first: "david",
      last: "danelia"
    },
    image: "georgia",
    dateOfBirth: "ten september nnn", // format date
    emails: [
      {
        email: "daneliatemur@gmail.com",
        primary: true
      }
    ],
    phones: [
      {
        phone: "995557345566",
        primary: true
      }
    ],
    sex: "male", // male or female
    subjects: [
      {
        subject: "history"
      }
    ],
    description: "me",
  };
  
  const teachers = new TeachersModel();
  let teacherId = "";

  
  teacherId = await teachers.add(data);
  // will return Teachers data including teacher's id
  const readteacher = await teachers.read(teacherId);

  // will update Teacher. This method should use the same validation as a constructor method
  const teacherId1 = teachers.update(teacherId, data)


  // will remove Teacher
  //await teachers.remove(teacherId)
  

  let david = {
    "name": {
      "first": "David",
      "last": "danelia"
    },
    "image": "david",
    "dateOfBirth": "nineteen of september nnn", // format date
    "phones": [
      {
        "phone": "557345566",
        "primary": true
      }
    ],
    "sex": "male", // male OR female
    "description": "about me"
  };
  
  // Create new Pupil from Pupil's data
  const pupils = new PupilsModel();
  let pupilId = "";

    // Create a new pupil
  pupilId = await pupils.add(david);
    // will return Pupils data including pupil's id
  const lister = await pupils.read(pupilId)
  
    // will update Pupil. This method should use the same validation as a constructor method
  // await pupils.update({ ID: pupilId, obj: david })
  
    // will remove pupil
    //await pupils.remove(pupilId)
  
    
  const room = 236;
  const groups = new GroupsModel();
  let groupId = "";

  // Create a new group
  groupId = await groups.add(room);
  
  // Add this pupil to this group
  await groups.addPupil(groupId, pupils);

  // Remove this pupil from this group
  //await groups.removePupil(groupId, pupils);

  // Update room for this group
  await groups.update(groupId, {
    room: 237
  });

  // Read information about group
  await groups.read(groupId);

  // It will return array of groups
  await groups.readAll();

  
  const gradebooks = new GradebooksModel(groups, teachers, lms);
  const pupilId1 = pupilId;
  const teacherId2 = teacherId;
  const level = 1;


  // Create a new gradebook
  const gradebookId = await gradebooks.add(level, groupId);

  // Destroy all data inside this gradebook
  //gradebooks.clear();

  const record = {
    "pupilId": pupilId1,
    "teacherId": teacherId2,
    "subjectId": history.id,
    "lesson": 1,
    "mark": 9
  };

  gradebooks.addRecord(gradebookId, record);

  // Read information about oliver results
  const oliver = await gradebooks.read(gradebookId, pupilId);
  
  // Read information about all students in this gradebook
  const students = await gradebooks.readAll(gradebookId);
  console.log(students)
})()










