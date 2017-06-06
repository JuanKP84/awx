import { N_ } from '../../../i18n';

export default {
    name: "inventories.edit.groups.edit.nested_hosts.add",
    url: "/add",
    ncyBreadcrumb: {
        parent: "inventories.edit.groups.edit.nested_hosts",
        label: N_("CREATE HOST")
    },
    views: {
        'hostForm@inventories': {
            templateProvider: function(GenerateForm, RelatedHostsFormDefinition, NestedHostsFormDefinition, $stateParams) {
                let form = RelatedHostsFormDefinition;
                if($stateParams.group_id){
                    form = NestedHostsFormDefinition;
                }
                return GenerateForm.buildHTML(form, {
                    mode: 'add',
                    related: false
                });
            },
            controller: 'RelatedHostAddController'
        }
    },
    resolve: {
        canAdd: ['rbacUiControlService', 'GetBasePath', '$stateParams', function(rbacUiControlService, GetBasePath, $stateParams) {
            return rbacUiControlService.canAdd(GetBasePath('inventory') + $stateParams.inventory_id + "/hosts")
                .then(function(res) {
                    return res.canAdd;
                })
                .catch(function() {
                    return false;
                });
        }]
    }
};
