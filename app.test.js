import supertest from 'supertest';
import app from './app.js';

const request = supertest(app);

// jest.mock('../your-database-layer', () => ({
//     getAllStaffs: jest.fn(() => [
//         { id: 'S186568', fullname: 'Jane Smith', Birthday: '1991-02-02', Gender: 2 }
//     ])
// }));



describe('POST /create', () => {
    test('creates a new staff member with valid data', async () => {
        const response = await request
            .post('/create')
            .send({
                StaffID: 'S1234567',
                fullname: 'John Doe',
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Staff member created successfully' });
    });

    test('returns an error when StaffID is missing', async () => {
        const response = await request
            .post('/create')
            .send({
                fullname: 'John Doe',
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'StaffID is required' });
    });
    test('returns an error when Fullname is missing', async () => {
        const response = await request
            .post('/create')
            .send({
                StaffID:'S1244568',
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Fullname is required' });
    });

    test('returns an error when Birthday is missing', async () => {
        const response = await request
            .post('/create')
            .send({
                StaffID:'S1234564',
                fullname:"User1",
                Gender: 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Birthday is required' });
    });
    
    test('returns an error when StaffID is too long', async () => {
        const response = await request
            .post('/create')
            .send({
                StaffID: 'S123456789', 
                fullname: 'John Doe',
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'StaffID must be exactly 8 characters' });
    });

});

describe('GET /staffs', () => {
    test('returns all staff members from the database', async () => {
        const expectedStaffs = [
            { StaffID:'S1234567', fullname: 'John Doe', Birthday: '1990-01-01', Gender: 1 }
        ];

        const response = await request.get('/staffs');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedStaffs);
    });
});

describe('GET /staff/:id', () => {
    test('returns the staff member when provided with a valid ID', async () => {
        const response = await request.get('/staff/S1234567');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ StaffID: 'S1234567', fullname: 'John Doe', Birthday: '1990-01-01', Gender: 1 });
    });

    test('returns a 404 status code with an appropriate error message when provided with an invalid ID', async () => {
        const response = await request.get('/staff/S186517');
        expect(response.status).toBe(404);
        expect(response.text).toBe('Staff member not found');
    });
});


describe('PUT /update/:id', () => {
    test('updates an existing staff member', async () => {
        const response = await request
            .put('/update/S1234567')
            .send({
                fullname: 'Updated Name',
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Staff member updated successfully' });
    });

    test('returns an error for invalid staff ID', async () => {
        const response = await request
            .put('/update/S1234547')
            .send({
                fullname: 'User2',
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(404); 
        expect(response.body).toEqual({ message: 'Staff member with that ID not found' });
    });

    test('returns an error for missing fullname ', async () => {
    
        const response = await request
            .put('/update/S1234567')
            .send({
                Birthday: '1990-01-01',
                Gender: 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Fullname is required' });
    });
    test('returns an error for missing Birthday', async () => {
    
        const response = await request
            .put('/update/S1234567')
            .send({
                fullname:"User2",
                Gender: 1
            });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Birthday is required' });
    });
});

describe('DELETE /delete/:id', () => {
    test('deletes the staff member with the given ID and returns a success message', async () => {
        const response = await request.delete('/delete/S1234567');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Staff member deleted successfully' });
    });

    test('returns an error when attempting to delete a non-existent staff member', async () => {
        const response = await request.delete('/delete/S1234565');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Staff member with that ID not found' });
    });
    
});