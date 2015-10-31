/**
 * Created by etaklar on 2015-10-03.
 */
function format(t){var e="<table><tr><th>Environment: </th><td>"+t.environment+"</td></tr><tr><th>Exported: </th><td>"+t.exported+"</td></tr><tr><th>File: </th><td>"+t.file+":"+t.line+"</td></tr><tr><th>Parameters:</th></tr>",a=t.parameters;return $.each(a,function(t,a){e+="<tr>",e+="<td></td>",e+="<td><strong>"+t+":</strong> "+a+"</td>",e+="<tr>"}),e+="</table>"}function update_tables(){var t=$("#node-1"),e=$("#node-2"),a=$(t).val(),r=$(t).attr("certname"),o=$(e).val(),n=$(e).attr("certname");a==r&&get_catalogue(a,"with"),o==n&&get_catalogue(o,"against")}function get_catalogue(t,e){var a="#compare-"+e+"-table",r=$("#targets a.active").attr("id");if($.fn.dataTable.isDataTable(a)){var o=$(a).DataTable();o.destroy(),$(a).empty()}if("edges"==r)$(a).DataTable({ajax:"/pano/api/catalogue/"+t+"?show=edges",columnDefs:[{title:"Source Type",targets:0},{title:"Source Title",targets:1},{title:"Relationship",targets:2},{title:"Target Type",targets:3},{title:"Target Title",targets:4}],columns:[{data:"source_type"},{data:"source_title"},{data:"relationship"},{data:"target_type"},{data:"target_title"}],order:[[1,"asc"]]});else if("resources"==r){var n=$(a).DataTable({ajax:"/pano/api/catalogue/"+t+"?show=resources",columnDefs:[{title:"Title",targets:0},{title:"Type",targets:1},{title:"Resource",targets:2}],columns:[{data:"title"},{data:"type"},{data:"resource"}],order:[[0,"asc"]]});$(a+" tbody").on("click","tr",function(){var t=$(this).closest("tr"),e=n.row(t);e.child.isShown()?(e.child.hide(),t.removeClass("shown")):"undefined"!=typeof e.data()&&(e.child(format(e.data())).show(),t.addClass("shown"))})}}$(document).ready(function(){$("#edges").click(function(){$(this).addClass("active").siblings().removeClass("active"),update_tables()}),$("#resources").click(function(){$(this).addClass("active").siblings().removeClass("active"),update_tables()});var t=$("#node-1"),e=$("#node-2");$(t).bind("typeahead:select",function(t,e){$("#node-1").attr("certname",e.certname),get_catalogue(e.certname,"with")}),$(e).bind("typeahead:select",function(t,e){$("#node-2").attr("certname",e.certname),get_catalogue(e.certname,"against")});var a=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.obj.whitespace("certname"),queryTokenizer:Bloodhound.tokenizers.whitespace,remote:{url:"/pano/api/nodes/search/?search=%QUERY",wildcard:"%QUERY"}});$(t).typeahead({highlight:!0},{name:"node-1",display:"certname",source:a}),$(e).typeahead({highlight:!0},{name:"node-2",display:"certname",source:a})});
