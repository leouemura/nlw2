## POST    htttp://localhost:3333/classes
JSON BODY{
    "name": "Leonardo Uemura",
    "avatar": "https://avatars.githubusercontent.com/u/56941739?s=460&u=7d59e1ffe14f6667c9d3e00876a09ed0490fa6d5&v=4",
    "whatsapp": "11912341234",
    "bio": "Passionate about learning new technologies and developing new projects through programming",
    "subject":"Javascript",
    "cost":80,
    "schedule":[
        { "week_day":1, "from":"8:00", "to":"12:00" },
        { "week_day":3, "from":"10:00", "to":"18:30" },
        { "week_day":4, "from":"8:00", "to":"12:00" }
    ]
}

## GET    htttp://localhost:3333/classes
QUERY:
week_day | 1
subject  | Javascript
time     | 8:00