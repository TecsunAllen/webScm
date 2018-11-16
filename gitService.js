
let Git = require('nodegit');
const path = require('path');
const uuid = require('uuid/v1');
let repository;

function initRepository() {
    Git.Repository.open('E:\\learn\\webScm').then((repos) => {
        repository = repos;
    });
}

function getStatus() {
    return repository.getStatus().then((list) => {
        list = list.map(item => {
            return {
                _id: uuid(),
                name: path.basename(item.path()),
                path: item.path(),
                isDeleted: item.isDeleted(),
                isIgnored: item.isIgnored(),
                isModified: item.isModified(),
                isRenamed: item.isRenamed(),
                isNew: item.isNew(),
                isConflicted: item.isConflicted(),
                inWorkingTree: item.inWorkingTree(),
                status: item.status(),
                isTypechange: item.isTypechange(),
                statusBit: item.statusBit(),
                headToIndex: item.headToIndex(),
                indexToWorkdir: item.indexToWorkdir(),
                inIndex: item.inIndex()
            };
        }).sort((a, b) => a.name >= b.name);
        const indexedChanges = list.filter((item) => item.status.some(statusItem => /INDEX/.test(statusItem)));
        const workTreeChanges = list.filter((item) => item.status.some(statusItem => /WT/.test(statusItem)));
        const conflictedChanges = list.filter((item) => item.isConflicted);
        return Promise.resolve({
            indexedChanges,
            workTreeChanges,
            conflictedChanges
        });
    });
}

initRepository();

module.exports = {
    getStatus
};