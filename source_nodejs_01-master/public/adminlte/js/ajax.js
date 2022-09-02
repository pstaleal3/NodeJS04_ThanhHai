const handleAjax = (link,field,id,evt) => {
   let value; let xhtml;
   let parent = $(evt).parent();
   switch (field) {
      case 'status':
         value = $(evt).data('value') == 'active' ? 'inactive' : 'active';
         xhtml = `<a href="javascript:void(0)" class="rounded-circle btn btn-sm ${value == 'active' ? 'btn-success' : 'btn-warning'}" onClick="handleAjax('${link}','status','${id}',this)" data-value="${value}"><i class="fas fa-check"></i></a>`;
         break;
      case 'ordering':
         value = evt.value;
         if(isNaN(value)) {
            evt.value = evt.value.replace(/[^0-9]/g,'');
            ntf(evt,'Please Insert Number','error')
            return;
         } 
         break;
      default:
         break;
   }
   $.ajax({
      method: "post",
      url: link,
      data: { id,field,value},
      dataType: "json"
      }).done(function( data ) {
         if(xhtml) {
            $(parent).html(xhtml);
            evt = $(parent).children();
         }
         ntf(evt);
      });
}
const handleSlug = (link,evt) => {
   let url = link + 'slug';
   let value = evt.value;
   $.ajax({
      method: "post",
      url,
      data: {value},
      dataType: "JSON"
      }).done(function( data ) {
         $("[name='slug']").val(data);
      });
}
// const handleChange = (link,field,id,evt) => {
//    let value = evt.value;
//    if(isNaN(value)) {
//       evt.value = evt.value.replace(/[^0-9]/g,'');
//       ntf(evt,'Please Insert Number','error')
//       return;
//    } 
//    $.ajax({
//    method: "post",
//    url: link,
//    data: { id,field,value},
//    dataType: "html"
//    }).done(function( msg ) {
//       ntf(evt);
//    });
// }
