'use strict';
// Spanker ve Shinoa 'dan Size..
const {Guild,GuildMember,User} = require('discord.js')
const {botRole,publicBotIDS,AdministratorRolePermissions,whitelist} = require('./config-client.json')
//Prototypes
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
/*
param işlerinin nasıl olduğunu bilmiyorum ztn kullanılmıyor iyi günler dilerim backup vs paylaşabilirim isterseniz
*/
Guild.prototype.closeAllAdministratorRoles = async function() {
    if(!this) return null
    let myRoles = botRole.concat(publicBotIDS)
    let b = this.roles.cache.filter(r =>  r.managed &&!myRoles.includes(r.id) && AdministratorRolePermissions.some(u => r.permissions.has(u))) 
    for (const [key] of b) { // forEach atmamanın sebebi async forEach kullanınca clientin anasını siktiği için for let kullanıyorum genelde
        await this.roles.cache.get(key).setPermissions(0,"✅ Security") 
    }
    // niye key kullandığımı hatırlamıyorum eskiden yapmistim 
    return console.log(`[${this.name}] All Permissions Denied`) // burda return atmamın hiç bir sebebi yok atmayabilirsiniz 
}

