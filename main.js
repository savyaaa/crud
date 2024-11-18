// /* globals fetch */
// var update = document.getElementById('update')
// var del = document.getElementById('delete')

// update.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'put',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       'name': 'Savya',
//       'quote': 'I find your lack of faith disturbing.'
//     })
//   })
//   .then(response => {
//     if (response.ok) return response.json()
//   })
//   .then(data => {
//     console.log(data)
//   })
// })

// del.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'delete',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name': 'Savya'
//     })
//   }).then(function (response) {
//     window.location.reload()
//   })
// })


/* globals fetch */
var update = document.getElementById('update');
var del = document.getElementById('delete');

// Update (PUT request)
update.addEventListener('click', function () {
  fetch('/quotes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Savya',
      quote: 'I find your lack of faith disturbing.'
    })
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Failed to update the quote.');
    })
    .then(data => {
      console.log(data);
      alert('Quote updated successfully!');
      window.location.reload(); // Reload the page to reflect the changes
    })
    .catch(error => {
      console.error(error);
      alert('Error updating the quote.');
    });
});

// Delete (DELETE request)
del.addEventListener('click', function () {
  fetch('/quotes', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Savya'
    })
  })
    .then(response => {
      if (response.ok) {
        alert('Quote deleted successfully!');
        window.location.reload(); // Reload the page to reflect the changes
      } else {
        throw new Error('Failed to delete the quote.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Error deleting the quote.');
    });
});
