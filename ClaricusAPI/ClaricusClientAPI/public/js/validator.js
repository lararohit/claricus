<script type="text/javascript">
    function validateForm()
    {
        var a=document.forms["Form"]["first_name"].value;
        var b=document.forms["Form"]["last_name"].value;
        var c=document.forms["Form"]["ol_first_name"].value;
        var d=document.forms["Form"]["ol_last_name"].value;
        if (a!="" && b!=""){return true; }
        if (c!="" && d!="") { return true; }     
        alert("Please Fill either the first name and last name (english) or first name and last name (other language) ");				
        return false;				
     }     
</script>