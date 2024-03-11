const $ = selector => document.querySelector(selector)
let quote = {}

const renderQuote = (data) => {
    quote = data
    const htmlTags = data.tags.map(tag => `<span>${tag}</span>`).join('')

    $('main h3').innerText = data.author
    $('main .badge').innerHTML = htmlTags
    $('main p').innerText = `"${data.content}"`
}

const handleRegroup = () => {
    $('#regroup').classList.add("fetching")
    fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => {
            $('#regroup').classList.remove("fetching")
            renderQuote(data)
        })
        .catch(error => console.error(error))
}

const handleLink = () => {
    $("#link").classList.add("fetching")
    const text = quote.content + String.fromCharCode(13) + quote.author
    navigator.clipboard.writeText(text)
        .then(() => {
            $("#link").classList.remove("fetching")
        }),
        () => {
            console.error("failed to copy")
        }
}

$('#regroup').addEventListener("click", handleRegroup)
$('#link').addEventListener("click", handleLink)

window.addEventListener("load", handleRegroup)