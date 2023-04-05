1) I did a simple treatment on the users POST route <http://localhost:3000/api/users/>. It should require important information and validate!
2) Rabbit sending is working.
3) Sending email only works if you enter an SMTP (I don't have one available at the moment)

4) Added some simple handling on the DELETE route <http://localhost:3000/api/user/{userID}/avatar>
 4.1) If the record exists in the DB and the file does not exist, it will be removed from the DB and will be downloaded/processed again
 4.2) The possibility of the file being orphaned, without an entry in the database, was not addressed. This could be resolved by using only the user's ID as the filename

5) Not required, but includes the DELETE <http://localhost:3000/api/users> route to delete all users and make testing easier.
6) I left some comments in the code just to organize it better
