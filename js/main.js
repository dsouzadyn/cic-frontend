
function uploadAndCheck() {
    
    var text1 = document.getElementById('text1').value;
    var text2 = document.getElementById('text2').value;

    const data = { 'Rawtext': text1 };

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(data),
        url: 'http://localhost:5000/Preprocessor',
    }

    // <div class="control">
    //     <div class="tags has-addons">
    //         <span class="tag is-dark">word</span>
    //         <span class="tag is-info">32</span>
    //     </div>
    // </div>

    var parent = document.getElementById('tags');
    parent.innerHTML = ""

    if (text1 !== "" && text2 !== "") {
        axios(options)
        .then((res) => {
            var data = res.data;
            for (var word in data.term_frequencies) {
                var template = 
                    '<div class="control">' +
                    '<div class="tags has-addons">' +
                    '<span class="tag is-dark">' + word + '</span>' +
                    '<span class="tag is-info">' + data.term_frequencies[word] + '</span>' +
                    '</div>' +
                    '</div>';
                parent.innerHTML += template;
            }
            
            document.querySelector('#metrics').scrollIntoView({
                behavior: 'smooth'
            })
            ScrollReveal().reveal('#metrics');
        })
    }


}