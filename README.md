
# About

This is a confession bot used in discord. It is used for anonymous posting of embarassing stories or revelations to the server. The messages are moderated by a team to be approved before the confession is publicly posted. It uses an SQL server to store the id's of the channels where confessions are to be posted. All confessions are anonymous and are never recorded anywhere by the bot. As such there is no retrieval of old confessions and who confessed them.

# Command lists

!channelid, returns the id of the channel or of a specified channel.

`[!channelid <channel name?>]`

!channelassign: assigns a designated channel or where this command is invoked to a specific function.
 
`[!channelassign <channel name?> <function name>]`


Current Channel Function Names:

 - confessions: Where confessions to this bot will be channeled through awaiting approval.
 - confessions_public: Where public confessions are posted.

!role: assigns a minimum role of who can use the confession function

`[!roleassign <role name> <role function name>]`

Current Role Function Names:

 - confession_role: The minimum role of who can use the confession.

!confessioncount, returns the current amount of confessions publicly posted or set the current number of confession count

`!confessioncount <number?>`
