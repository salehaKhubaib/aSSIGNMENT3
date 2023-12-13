const itemsContainer = document.getElementById('itemsList');

// Function to fetch all items and display them as cards
const localhost = 'http://localhost:4000';

// Function to fetch and display all items
async function fetchItems() {
  try {
    const response = await fetch(`${localhost}/api/items`);
    const items = await response.json();

    itemsContainer.innerHTML = ''; // Clear previous items
    items.forEach(item => {
      const card = createItemCard(item);
      itemsContainer.appendChild(card);
    });
  } catch (err) {
    console.error('Error fetching items:', err);
  }
}a

// Function to create a card for an item
function createItemCard(item) {
  const card = document.createElement('div');
  card.classList.add('card','container','mt-5','p-3','rounded-3');

  const cardContent = document.createElement('div');
  cardContent.classList.add('card-content','container');

  const itemName = document.createElement('strong');
  itemName.textContent = item.name;

  const itemDescription = document.createElement('p');
  itemDescription.textContent = item.description;

  // Edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.classList.add('btn', 'btn-info', 'mr-2');
  editButton.setAttribute('data-toggle', 'modal');
  editButton.setAttribute('data-target', '#editModal');
  editButton.addEventListener('click', () => {
    document.getElementById('editName').value = item.name;
    document.getElementById('editDescription').value = item.description;

    document.getElementById('saveChanges').addEventListener('click', async () => {
      const newName = document.getElementById('editName').value;
      const newDescription = document.getElementById('editDescription').value;

      try {
        const response = await fetch(`${localhost}/api/updateItems/${item._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName, description: newDescription }),
        });
        if (response.ok) {
          // Update the item object
          item.name = newName;
          item.description = newDescription;

          // Update the UI with the updated item data
          itemName.textContent = newName;
          itemDescription.textContent = newDescription;

          $('#editModal').modal('hide'); // Hide the modal
        } else {
          console.error('Failed to update item');
        }
      } catch (err) {
        console.error('Error updating item:', err);
      }
    });
  });

  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.addEventListener('click', async () => {
    try {
      const response = await fetch(`${localhost}/api/deleteItems/${item._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        card.remove(); // Remove the card from the UI upon successful deletion
      } else {
        console.error('Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  });

  cardContent.appendChild(itemName);
  cardContent.appendChild(itemDescription);
  cardContent.appendChild(editButton);
  cardContent.appendChild(deleteButton);
  card.appendChild(cardContent);

  return card;
}

// Function to add a new item
const itemForm = document.getElementById('itemForm');
itemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;

  try {
    const response = await fetch(`${localhost}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    const newItem = await response.json();
    console.log('New item added:', newItem);
    const newCard = createItemCard(newItem);
    itemsContainer.appendChild(newCard); // Add new item as a card
  } catch (err) {
    console.error('Error adding item:', err);
  }
});

// Initially fetch and display items on page load
fetchItems();
