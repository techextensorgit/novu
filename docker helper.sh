redis
mongodb
api
worker
ws
web
widget
embed



mongo                                                    latest          fb5fba25b25a   12 days ago     654MB
redis                                                    latest          7e89539dd8bd   2 weeks ago     130MB
redis                                                    alpine          c1dc010e6f24   2 weeks ago     30.2MB
ghcr.io/novuhq/novu/worker                               0.16.0          df2ef11054d7   6 weeks ago     2.02GB
ghcr.io/novuhq/novu/api                                  0.16.0          ce111cd23bc9   6 weeks ago     2.02GB
ghcr.io/novuhq/novu/widget                               0.16.0          efed20bb6d34   6 weeks ago     2.07GB
ghcr.io/novuhq/novu/embed                                0.16.0          e885e92574f1   6 weeks ago     1.3GB
ghcr.io/novuhq/novu/web                                  0.16.0          e131ac2f8d18   6 weeks ago     183MB
ghcr.io/novuhq/novu/ws                                   0.16.0          a4c11b3c10b6   6 weeks ago     1.16GB


docker run -d -p 27017:27017 --name mongo fb5fba25b25a 
docker run -d --name redis c1dc010e6f24 
docker run -d  -p 3004:3004 --name worker df2ef11054d7 
docker run -d -p 3000:3000 --name api ce111cd23bc9 
docker run -d -p 4500:4500 --name  widget efed20bb6d34 
docker run -d -p 4701:4701 --name embed e885e92574f1 
docker run -d -p 3002:3002 --name ws a4c11b3c10b6 
docker run -d -p 4200:4200 --name  web e131ac2f8d18 


docker rm c4af0f56e261 50ae0da422c1 ea3c6a49f349 0602fb8e3edf 09d6b51da90c 8230509c73f9 8e4fec7721e1 6bc90deb4e7e f8f1c204542b d8cbf8c34a0f 8893b01355ce 30f9e7f1359c e5eb935e2ec9





fb5fba25b25a c1dc010e6f24 df2ef11054d7 ce111cd23bc9 efed20bb6d34 e885e92574f1 e131ac2f8d18




mongo                                           latest    fb5fba25b25a   13 days ago     654MB
redis                                           alpine    c1dc010e6f24   2 weeks ago     30.2MB
ghcr.io/novuhq/novu/worker                      0.16.0    df2ef11054d7   6 weeks ago     2.02GB
ghcr.io/novuhq/novu/api                         0.16.0    ce111cd23bc9   6 weeks ago     2.02GB
ghcr.io/novuhq/novu/widget                      0.16.0    efed20bb6d34   6 weeks ago     2.07GB
ghcr.io/novuhq/novu/embed                       0.16.0    e885e92574f1   6 weeks ago     1.3GB
ghcr.io/novuhq/novu/web                         0.16.0    e131ac2f8d18   6 weeks ago     183MB
ghcr.io/novuhq/novu/ws      


db.createUser(
{
"user": "TE@Admin",
"pwd": "7r8h3e8Y$Q#A",
"roles": [ { role: "userAdminAnyDatabase", db: "admin" } ]
}
)
