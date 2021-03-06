import Sequelize, { UUID } from 'sequelize';
import { accesses,requestStatus, problemStatus} from './strings.mjs'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './test.db'
});

const Employee  = sequelize.define('employee', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    firstName:
    {
        type:Sequelize.STRING,
        validate:{
            min:3
        }
    },
    lastName:{
        type:Sequelize.STRING,
        validate:{
            min:3
        }
    },
    password:{
        type:Sequelize.STRING,
        validate:{
            min:3
        }
    },
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:true
        }
    },
    isManager:{
        type:Sequelize.BOOLEAN,
    },
    departmentId:{
        type:Sequelize.STRING
    }
});

const Issue = sequelize.define('issue',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    reason:{
        type:Sequelize.STRING,
        validate:{
            min:5
        }
    },
    createDate:{
        type:Sequelize.STRING,
        allowNull: false
    },
    status:{
        type:Sequelize.STRING,
        validate:{
            isIn:[problemStatus]
        }
    }
})

const TemporaryCode  = sequelize.define('temporaryCode', {

    email:{
        type:Sequelize.STRING,
        primaryKey: true,
        validate:{
            isEmail:true
        }
    },
    code:{
        type:Sequelize.INTEGER,
    }

});

const Request = sequelize.define('request',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    reason:{
        type:Sequelize.STRING,
        validate:{
            min:5
        }
    },
    createDate:{
        type:Sequelize.STRING,
        allowNull: false
        
    },
    requestDate:{
        type:Sequelize.STRING,
        allowNull: false
        
    },
    status:{
        type:Sequelize.STRING,
        validate:{
            isIn:[requestStatus]
        }
    },
    type:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    numberOfHours:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    employeeId:{
        type: Sequelize.UUID,
    }
})

const Departament = sequelize.define('department',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title:Sequelize.STRING
})


const Access = sequelize.define('access',{
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    type:{
        type:Sequelize.STRING,
        validate:{
            isIn:[accesses]
        }
    },
    givenTo:{
        type:Sequelize.UUID,
        validate:{
            allowNull:false
        }
    },
    from:{
        type:Sequelize.UUID,
        validate:{
            allowNull:false
        }
    }
})

Employee.hasMany(Request, {
    foreignKey: 'employeeId'
});

Request.belongsTo(Employee, {
    foreignKey: 'employeeId'
});

Departament.hasMany(Employee, {
    foreignKey:'departmentId'
})




async function initialize() {
    
    
    await sequelize.authenticate();
    await sequelize.sync({
        alter: true,
        //force:true
    });
}

export {
    initialize,
    Employee,
    Departament,
    Request,
    Access,
    Issue,
    TemporaryCode
}