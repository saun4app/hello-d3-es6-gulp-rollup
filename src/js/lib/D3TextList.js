import * as d3 from 'd3';

export class D3TextList {
    constructor(param_obj = {}) {
        this._init_param(param_obj);

        return this;
    }

    show_list(param_obj = {}) {
        let self = this;

        this._init_param(param_obj);

        let container_id = '#' + this.el_container_id;
        d3.select(container_id).selectAll('*').remove();

        this.list_obj = d3.select(container_id).append('ul');

        this.list_obj.attr('class', self.el_list_class)
            .selectAll('li')
            .data(self.item_array)
            .enter()
            .append('li').each(function (d) {
                d3.select(this).attr('class', d.item_class);
                d3.select(this).text(d.label);
            });

        this._set_event();
    }

    _set_event() {
        let self = this;

        this.list_obj.selectAll('li')
            .on('mouseover', function () {
                d3.select(this).classed(self.el_mouseover_class, true);
            }).on('mouseout', function () {
                d3.select(this).classed(self.el_mouseover_class, false);
            });
    }

    _init_param(param_obj = {}) {
        this.el_container_id = param_obj.el_container_id ? param_obj.el_container_id : 'el_message_list';
        this.el_list_class = param_obj.el_list_class ? param_obj.el_list_class : 'w3-ul w3-border';
        this.el_mouseover_class = param_obj.el_mouseover_class ? param_obj.el_mouseover_class : 'w3-large';
        this.item_array = param_obj.item_array ? param_obj.item_array : [];
    }
}
