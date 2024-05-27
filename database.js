import mysql from 'mysql2/promise'; // Import mysql2/promise instead of mysql2
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: parseInt(process.env.MYSQL_PORT) || 3308
});

export async function getAllStaffs() {
    const [rows] = await pool.query("SELECT StaffID, fullname, DATE_FORMAT(Birthday, '%Y-%m-%d') AS Birthday, Gender FROM staff");
    return rows;
}

export async function getStaff(id) {
    const [rows] = await pool.query("SELECT StaffID, fullname, DATE_FORMAT(Birthday, '%Y-%m-%d') AS Birthday, Gender FROM staff WHERE StaffID = ?", [id]);
    return rows[0];
}

export async function createStaff(StaffID, fullname, Birthday, Gender){
 const result=   await pool.query(
        'INSERT INTO staff (StaffID, fullname, Birthday, Gender) VALUES(?,?,?,?)',[StaffID, fullname, Birthday, Gender]
    );

return result
}

export async function updateStaff(id, newData) {
    const { fullname, Birthday, Gender } = newData;
    const [result] = await pool.query(
        'UPDATE staff SET fullname = ?, Birthday = ?, Gender = ? WHERE StaffID = ?',
        [fullname, Birthday, Gender, id]
    );
    return result;
}

export async function deleteStaff(id) {
    const [result] = await pool.query(
        'DELETE FROM staff WHERE StaffID = ?',
        [id]
    );
    return result;
}
