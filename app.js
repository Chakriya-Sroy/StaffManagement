import express from "express"
import cors from "cors"
import { getAllStaffs,getStaff ,createStaff, updateStaff, deleteStaff} from "./database.js";

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
  }));

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/staffs', async(req, res) => {
    const staffs =await getAllStaffs()
    res.send(staffs);
});

app.get('/staff/:id', async(req, res) => {
    const id=req.params.id;
    const staff=await getStaff(id);
    if(staff){
        res.send(staff);
    }else{
        res.status(404).send('Staff member not found')
    }
});

app.post('/create',async(req,res)=>{
    try {
        const { StaffID = '', fullname = '', Birthday = '', Gender = '' } = req.body;

        let errors = [];

        if (!StaffID) {
            errors.push('StaffID is required');
        }
        else if(StaffID.length>8){
            errors.push('StaffID must be exactly 8 characters');
        }
        if (!fullname) {
            errors.push('Fullname is required');
        }
        if (!Birthday) {
            errors.push('Birthday is required');
        }
        if (!Gender) {
            errors.push('Gender is required');
        }
    
        if (errors.length > 0) {
            return res.status(400).json({ message: errors.join(', ') });
        }
  
        const existingStaff = await getStaff(StaffID); 
        if (existingStaff) {
          
            return res.status(409).json({ message: 'StaffID already exists' });
        }
        const result = await createStaff(StaffID, fullname, Birthday, Gender);

        res.status(200).json({ message: 'Staff member created successfully' });

    } catch (error) {
        console.error('Error creating staff:', error);
        res.status(500).json({ message: error.message });
    }
});

app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingStaff = await getStaff(id);

        if (!existingStaff) {
            return res.status(404).json({ message: 'Staff member with that ID not found' });
        }
        const {fullname ='', Birthday='' , Gender ='' } =req.body;
        let errors = [];

        if (!fullname) {
            errors.push('Fullname is required');
        }
        if (!Birthday) {
            errors.push('Birthday is required');
        }
        if (!Gender) {
            errors.push('Gender is required');
        }

        if (errors.length > 0) {
            return res.status(400).json({ message: errors.join(', ') });
        }
    
        const result =await updateStaff(id,{fullname,Birthday,Gender});
        res.status(200).json({ message: 'Staff member updated successfully'});
    
        
    } catch (error) {
      
        res.status(500).json({ message: erorr });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingStaff = await getStaff(id);
        if (!existingStaff) {
            return res.status(404).json({ message: 'Staff member with that ID not found' });
        }
        const result =deleteStaff(id);
        res.status(200).json({ message: 'Staff member deleted successfully' });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({ message: 'Failed to delete staff member' });
    }
});

  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("something broke!");
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

export default app; 