import express, { request, response } from 'express';
import { Employee, Request, Departament, Access, Issue, TemporaryCode} from './repository.mjs';
import {
    getRecords, postRecord, deleteRecords,
    getRecord, headRecord, deleteRecord, putRecord, patchRecord, 
    getChildrenOfParent, postChildOfParent,
    getChildOfParent, deleteChildOfParent, putChildOfParent,login, changePassword,
    createAccountFirstPart, createAccountSecondPart, getRequestsOfDepartment
} from './service.mjs';

const router = express.Router();


router.route('/employees')
    .get((request, response)=> getRecords(Employee, request, response))
    .post((request, response)=> postRecord(Employee, request, response))
    .delete((request, response)=> deleteRecords(Employee, request, response))
    
 router.route('/employees/:id')
    .get((request, response)=> getRecord(Employee, request, response))
    .head((request, response)=> headRecord(Employee, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Employee, request, response))
    .patch((request, response)=> patchRecord(Employee, request, response))
    .delete((request, response)=> deleteRecord(Employee, request, response))

router.route('/requests')
    .get((request, response)=> getRecords(Request, request, response))
    .post((request, response)=> postRecord(Request, request, response))
    .delete((request, response)=> deleteRecords(Request, request, response))
    
 router.route('/requests/:id')
    .get((request, response)=> getRecord(Request, request, response))
    .head((request, response)=> headRecord(Request, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Request, request, response))
    .patch((request, response)=> patchRecord(Request, request, response))
    .delete((request, response)=> deleteRecord(Request, request, response))


    router.route('/departments')
    .get((request, response)=> getRecords(Departament, request, response))
    .post((request, response)=> postRecord(Departament, request, response))
    .delete((request, response)=> deleteRecords(Departament, request, response))
    
 router.route('/departments/:id')
    .get((request, response)=> getRecord(Departament, request, response))
    .head((request, response)=> headRecord(Departament, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Departament, request, response))
    .patch((request, response)=> patchRecord(Departament, request, response))
    .delete((request, response)=> deleteRecord(Departament, request, response))

  
  router.route('/departments/:fid/employees')
    .get((request,response)=>getChildrenOfParent(Departament,'employee',request,response))
    .post((request,response)=>postChildOfParent(Departament,'departament',Student,request,response))
    
    router.route('/accesses')
    .get((request, response)=> getRecords(Access, request, response))
    .post((request, response)=> postRecord(Access, request, response))
    .delete((request, response)=> deleteRecords(Access, request, response))
    
    router.route('/accesses/:id')
    .get((request, response)=> getRecord(Access, request, response))
    .head((request, response)=> headRecord(Access, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Access, request, response))
    .patch((request, response)=> patchRecord(Access, request, response))
    .delete((request, response)=> deleteRecord(Access, request, response))

 
    router.route('/issues')
    .get((request, response)=> getRecords(Issue, request, response))
    .post((request, response)=> postRecord(Issue, request, response))
    .delete((request, response)=> deleteRecords(Issue, request, response))
   
    router.route('/issues/:id')
    .get((request, response)=> getRecord(Issue, request, response))
    .head((request, response)=> headRecord(Issue, request, response))//verifica daca exista
    .put((request, response)=> putRecord(Issue, request, response))
    .patch((request, response)=> patchRecord(Issue, request, response))
    .delete((request, response)=> deleteRecord(Issue, request, response))

    router.route('/tempcodes')
    .get((request,response)=>getRecords(TemporaryCode,request,response))
    .delete((request,response)=>deleteRecords(TemporaryCode,request,response))


   router.route('/employees/:fid/requests')
   .get((request,response)=>getChildrenOfParent(Employee,'request',request,response))
   .post((request,response)=>postChildOfParent(Employee,'employee',Request,request,response))

   router.route('/teams/:fid/jury')
   .get((request,response)=>getChildrenOfParent(Team,'jury',request,response))

   router.route('/departments/:fid/employees/:sid')
   .get((request,response)=>getChildrenOfParent(Jury,'student',request,response))
   .post((request,response)=>postChildOfParent(Jury,'jury',Student,request,response))

   router.route('/departments/:id/requests')
   .get((request,response)=>getRequestsOfDepartment(request,response))

   router.route('/login')
   .post((request, response)=> login(request,response))

   router.route('/employeeChangePassword/:id')
   .patch((request,response)=>changePassword(request,response))

   router.route('/firstPartCreateAccount')
   .post((request,response)=>createAccountFirstPart(request,response));

   router.route('/secondPartCreateAccount')
   .post((request,response)=>createAccountSecondPart(request,response))


    export default router;