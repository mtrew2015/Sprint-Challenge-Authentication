# What is the purpose of using sessions?
### The purpose of using sessions is to authenticate the user using cookies and persist data across requests. This makes it so a user does not need to be reauthenticated with every request to the server.


# What does bcrypt do to help us store passwords in a secure manner.

### Bcrypt helps us by making it so we are not storing the users actual password to the server. Instead we are encrypting the password and adding a salt, that way the true password is unknown if someone breaks into your database.


# What does bcrypt do to slow down attackers?

### It would make it much more difficult for them to be able to steal information that is sensitive such as passwords. If they steal the password to one users account, many people use the same password across all of their logins, so this would definitely hinder their efforts. Since if they did gain acess to the password database, it would contain the hashed versions of the passwords which are only 1 way encryption, meaning they can never get the original version back with just that hash, unless they know the complex hashing algorithm.


# What are the three parts of the JSON Web Token?

### The header, the payload, and the signature which would include a secret. All this would be combined into a base64 encoding encryption algorithm, but the secret would not be able to be decrypted by anyone with the web token.