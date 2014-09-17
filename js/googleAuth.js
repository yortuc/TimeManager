function onLoadCallback()
{
    gapi.client.load('plus', 'v1',function(){});
}

function loginCallback(result)
{
    if(result['status']['signed_in'])
    {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });

        request.execute(function (resp){
           app.user.update(resp);
        });
    }
}