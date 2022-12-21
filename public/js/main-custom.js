$("#userImage").on('click',()=> {
    $("input[id='userImageFile']").trigger('click');
});

$(document).ready(()=>{
    $('#userImageFile').change(function(){
      const file = this.files[0];
      console.log(file);
      if (file){
        let reader = new FileReader();
        reader.onload = function(event){
          console.log(event.target.result);
          $('#userImage').attr('src', event.target.result);
          $('#userImage').css({'width': '300px', 'height': '300px'});

        }
        reader.readAsDataURL(file);
      }
    });
  });

  $("#dreamClubImage").on('click',()=> {
    $("input[id='dreamClubImageFile']").trigger('click');
});

$(document).ready(()=>{
    $('#dreamClubImageFile').change(function(){
      const file = this.files[0];
      console.log(file);
      if (file){
        let reader = new FileReader();
        reader.onload = function(event){
          console.log(event.target.result);
          $('#dreamClubImage').attr('src', event.target.result);
          $('#dreamClubImage').css({'width': '300px', 'height': '300px'});

        }
        reader.readAsDataURL(file);
      }
    });
  });


  $("#playerImage").on('click',()=> {
    $("input[id='playerImageFile']").trigger('click');
});

  $(document).ready(()=>{
    $('#playerImageFile').change(function(){
      const file = this.files[0];
      console.log(file);
      if (file){
        let reader = new FileReader();
        reader.onload = function(event){
          console.log(event.target.result);
          $('#playerImage').attr('src', event.target.result);
          $('#playerImage').css({'width': '300px', 'height': '300px'});

        }
        reader.readAsDataURL(file);
      }
    });
  });

  $("#clubImage").on('click',()=> {
    $("input[id='clubImageFile']").trigger('click');
});

$(document).ready(()=>{
    $('#clubImageFile').change(function(){
      const file = this.files[0];
      console.log(file);
      if (file){
        let reader = new FileReader();
        reader.onload = function(event){
          console.log(event.target.result);
          $('#clubImage').attr('src', event.target.result);
          $('#clubImage').css({'width': '300px', 'height': '300px'});

        }
        reader.readAsDataURL(file);
      }
    });
  });