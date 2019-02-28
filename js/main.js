
function uploadAndCheck() {
    
    var text1 = document.getElementById('text1').value;
    var text2 = document.getElementById('text2').value;

    const data = { 'Input1': text1, 'Input2': text2 };

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

    var parent1 = document.getElementById('tags1');
    var parent2 = document.getElementById('tags2');
    var cosineValue = document.getElementById('cosine_value');
    
    parent1.innerHTML = "";
    parent2.innerHTML = "";

    if (text1 !== "" && text2 !== "") {
        axios(options)
        .then((res) => {
            var data = res.data;
            console.log(data);
            cosineValue.innerText = (data.cosine_value*100).toString() + " %";
            for (var word in data.term_frequencies_doc1) {
                var template = 
                    '<div class="control">' +
                    '<div class="tags has-addons">' +
                    '<span class="tag is-dark">' + word + '</span>' +
                    '<span class="tag is-info">' + data.term_frequencies_doc1[word] + '</span>' +
                    '</div>' +
                    '</div>';
                parent1.innerHTML += template;
            }
            for (var word in data.term_frequencies_doc2) {
                var template = 
                    '<div class="control">' +
                    '<div class="tags has-addons">' +
                    '<span class="tag is-dark">' + word + '</span>' +
                    '<span class="tag is-success">' + data.term_frequencies_doc2[word] + '</span>' +
                    '</div>' +
                    '</div>';
                parent2.innerHTML += template;
            }
            
            document.querySelector('#metrics').scrollIntoView({
                behavior: 'smooth'
            })
            ScrollReveal().reveal('#metrics');
        })
    }


}