//state
import Vue from 'vue';
import Vuex from 'vuex';

import connectionService from './service/connectionService';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        messageList: [],
        manageTree: {
            indexedChanges: [],
            workTreeChanges: [],
            conflictedChanges: []
        }
    },
    mutations: {
        initConnection() {
            return connectionService.initConnection()
                .then(() => {
                    connectionService.watchData(data => {
                        this.state.messageList.unshift(data.message);
                        if (data.status === 'closed') this.state.messageList.unshift(`---------------${data.commandString}--------------`);

                        if (data.type === 'statusSync') {

                            Object.assign(this.state.manageTree, data.data);

                        }
                    });
                    connectionService.statusSync();
                });


        },
        executeCommand(state, commandString) {
            connectionService.executeCommand(commandString);
        },
        statusSync() {
            connectionService.statusSync();
        }
    }
});




export default store;

