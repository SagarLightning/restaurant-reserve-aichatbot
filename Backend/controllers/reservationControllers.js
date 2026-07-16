// import reservationModels from "../models/reservationModels.js";

// const createReservation=async(req, res)=>{
//     try {
//         const {name, email, phone, date, time, guests} = req.body;
//         if(!name||!email||!phone||!date||!time||!guests){
//             return res.json({success:false, message:"All Fields are requried"})
//         }
//         const newReservation=new reservationModels({name, email,phone, date, time, guests})
//         await newReservation.save()
//     } catch (error) {
//         console.log(error);
//         res.json({success:false, message:error.message})
        
//     }
// }
// const getAllReservation=async(req, res)=>{

// }
// const deleteReservation=async(req, res)=>{

// }

// export {createReservation, getAllReservation, deleteReservation}

import reservationModels from "../models/reservationModels.js";

const createReservation = async (req, res) => {
    console.log('=== CREATE RESERVATION CALLED ===');
    try {
        // Add debugging
        console.log('Request body:', req.body);
        console.log('Request headers:', req.headers);
        
        const { name, email, phone, date, time, guests } = req.body;
        
        if (!name || !email || !phone || !date || !time || !guests) {
            console.log('Missing fields validation failed');
            return res.json({ success: false, message: "All Fields are required" });
        }
        
        console.log('Creating new reservation with data:', { name, email, phone, date, time, guests });
        
        // Fixed: Include phone in the new reservation object
        const newReservation = new reservationModels({ 
            name, 
            email, 
            phone,  // This was missing
            date, 
            time, 
            guests 
        });
        
        console.log('About to save to database...');
        await newReservation.save();
        console.log('Reservation saved successfully:', newReservation);
        
        // Added success response
        return res.json({ 
            success: true, 
            message: "Reservation created successfully", 
            data: newReservation 
        });
        
    } catch (error) {
        console.log('ERROR in createReservation:', error);
        return res.json({ success: false, message: error.message });
    }
};

const getAllReservation = async (req, res) => {
    try {
        const reservations = await reservationModels.find({});
        res.json({ 
            success: true, 
            data: reservations 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReservation = await reservationModels.findByIdAndDelete(id);
        
        if (!deletedReservation) {
            return res.json({ success: false, message: "Reservation not found" });
        }
        
        res.json({ 
            success: true, 
            message: "Reservation deleted successfully" 
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { createReservation, getAllReservation, deleteReservation };