import {D3TextList} from './lib/D3TextList';

let item_array = [
    {"label": "d3 es6 is good.", "item_class": "good-value"},
    {"label": "d3 es6 is ok.", "item_class": "ok-value"},
    {"label": "d3 es6 is not so good.", "item_class": "w3-red"}
];

let param_obj = {};
param_obj.el_container_id = 'el_message_list';
param_obj.item_array = item_array;

let text_list_obj = new D3TextList();
text_list_obj.show_list(param_obj);
