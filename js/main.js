
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
    
    var max1 = 0;
    var max2 = 0;

    parent1.innerHTML = "";
    parent2.innerHTML = "";

    if (text1 !== "" && text2 !== "") {
        axios(options)
        .then((res) => {
            var data = res.data;
            cosineValue.innerText = (data.cosine_value*100).toString() + " %";
            max1 = Math.max.apply(null, Object.keys(data.term_frequencies_doc1).map(function (key) { return data.term_frequencies_doc1[key];}));
            max2 = Math.max.apply(null, Object.keys(data.term_frequencies_doc2).map(function (key) { return data.term_frequencies_doc2[key];}));
            for (var word in data.term_frequencies_doc1) {
                console.log(data.term_frequencies_doc1[word] === max1)
                var template = 
                    '<div class="control">' +
                    '<div class="tags has-addons">' +
                    '<span class="tag is-dark">' + word + '</span>' +
                    '<span class="tag ' + ((data.term_frequencies_doc1[word] === max1) ? 'is-warning">' : 'is-info">');
                    template += data.term_frequencies_doc1[word] + '</span>' +
                    '</div>' +
                    '</div>';
                parent1.innerHTML += template;
            }
            for (var word in data.term_frequencies_doc2) {
                var template = 
                    '<div class="control">' +
                    '<div class="tags has-addons">' +
                    '<span class="tag is-dark">' + word + '</span>' +
                    '<span class="tag ' + ((data.term_frequencies_doc2[word] === max2) ? 'is-warning">' : 'is-info">');
                    template += data.term_frequencies_doc2[word] + '</span>' +
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