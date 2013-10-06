var base = "http://162.243.27.156/";

window.addEventListener("load", function(){
    $("#windowToggle").on("click", function(){
        $.ajax({
            type : "POST",
            url : base,
            data : {"val": "open"}
        }).done(function(data){
            console.log(data);
        });
    });
});
