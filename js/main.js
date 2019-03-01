
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

function getExt(filename) {
    return filename.name.split('.').pop();
}

function uploadAndCheck() {
    var words = [
        {text: "Lorem", weight: 13},
        {text: "Ipsum", weight: 10.5},
        {text: "Dolor", weight: 9.4},
        {text: "Sit", weight: 8},
        {text: "Amet", weight: 6.2},
        {text: "Consectetur", weight: 5},
        {text: "Adipiscing", weight: 5},
        /* ... */
      ];
    $('#word_cloud').jQCloud(words);

    var text1 = document.getElementById('text1').value;
    var text2 = document.getElementById('text2').value;

    const data = { 'Input1': text1, 'Input2': text2 };

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(data),
        url: 'http://localhost:5000/Preprocessor',
    }

    const options_sysnet = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(data),
        url: 'http://localhost:5000/WordNet',
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
    } else {
        var doc1 = document.getElementById('doc1');
        var doc2 = document.getElementById('doc2');
        var b64doc1 = "";
        var b64doc2 = "";
        
        getBase64(doc1.files[0])
            .then((res) => b64doc1 = res);
        getBase64(doc2.files[0])
            .then((res) => {
                b64doc2 = res;
                var ext1 = '';
                var ext2 = '';
                if(getExt(doc1.files[0]) == 'txt') {
                    ext1 = '3'
                }
                if(getExt(doc1.files[0]) == 'pdf') {
                    ext1 = '1'
                }
                if(getExt(doc2.files[0]) == 'txt') {
                    ext2 = '3'
                }
                if(getExt(doc2.files[0]) == 'pdf') {
                    ext2 = '1'
                }
                var data = {
                    base64_1: b64doc1,
                    extension_1: ext1,
                    base64_2: b64doc2,
                    extension_2: ext2
                };
                console.log(data);
                const options_file = {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: JSON.stringify(data),
                    url: 'http://localhost:5000/FileUpload',
                }
                axios(options_file).then((res) => {
                    var data = res.data;
                    console.log(data);
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
                });
            });
            

    }


}