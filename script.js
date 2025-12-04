function inventoryApp() {
    return {
        // Sample initial data
        products: [
            { 
                name: "Front motorcycle tire", 
                brand: "Dunlop", 
                quantity: 15, 
                price: 3500, 
                inStock: true 
            },
            { 
                name: "Rear motorcycle tire", 
                brand: "Michelin", 
                quantity: 10, 
                price: 3800, 
                inStock: true 
            },
            { 
                name: "Brake pads", 
                brand: "EBC", 
                quantity: 0, 
                price: 1200, 
                inStock: false 
            },
            { 
                name: "Break fluid reservoir", 
                brand: "Tsubaki", 
                quantity: 25, 
                price: 250, 
                inStock: true 
            },
            { 
                name: "Mirror set", 
                brand: "Honda", 
                quantity: 15, 
                price: 380, 
                inStock: true 
            },
            { 
                name: "ignition coil", 
                brand: "Yamaha", 
                quantity: 10, 
                price: 120, 
                inStock: true 
            },
            { 
                name: "Oil filter", 
                brand: "OKM Racing", 
                quantity: 18    , 
                price: 55, 
                inStock: true 
            },
            { 
                name: "Swing arm ", 
                brand: "Suzuki", 
                quantity: 12, 
                price: 220, 
                inStock: true 
            },
            { 
                name: "Spark plug", 
                brand: "Kawasaki", 
                quantity: 0, 
                price: 180, 
                inStock: false 
            },
        ],
        newProduct: {
            name: "",
            brand: "",
            quantity: 0,
            price: 0,
            inStock: true
        },
        editedProduct: {
            index: null,
            name: "",
            brand: "",
            quantity: 0,
            price: 0,
            inStock: true
        },
        showEditModal: false,
        searchTerm: "",
        
        // Computed properties
        get filteredProducts() {
            if (!this.searchTerm) return this.products;
            const term = this.searchTerm.toLowerCase();
            return this.products.filter(product => 
                product.name.toLowerCase().includes(term) || 
                (product.brand && product.brand.toLowerCase().includes(term))
            );
        },
        
        // Methods
        addProduct() {
            if (!this.newProduct.name) {
                alert("Please select a product");
                return;
            }
            
            this.products.push({...this.newProduct});
            
            // Reset form
            this.newProduct = {
                name: "",
                brand: "",
                quantity: 0,
                price: 0,
                inStock: true
            };
        },
        
        editProduct(index) {
            this.editedProduct = {...this.products[index], index};
            this.showEditModal = true;
            
            // Feather icons replacement for modal
            setTimeout(() => feather.replace(), 50);
        },
        
        updateProduct() {
            if (this.editedProduct.index !== null) {
                const updatedProduct = {
                    name: this.editedProduct.name,
                    brand: this.editedProduct.brand,
                    quantity: this.editedProduct.quantity,
                    price: this.editedProduct.price,
                    inStock: this.editedProduct.inStock
                };
                
                // Automatically update stock status based on quantity
                if (this.editedProduct.quantity <= 0) {
                    updatedProduct.inStock = false;
                } else if (!this.editedProduct.inStock && this.editedProduct.quantity > 0) {
                    updatedProduct.inStock = true;
                }
                
                this.products[this.editedProduct.index] = updatedProduct;
this.showEditModal = false;
            }
        },
        
        deleteProduct(index) {
            if (confirm("Are you sure you want to delete this product?")) {
                this.products.splice(index, 1);
            }
        },
        
        // Local storage functions
        saveToLocalStorage() {
            localStorage.setItem('motorPartsInventory', JSON.stringify(this.products));
        },
        
        loadFromLocalStorage() {
            const savedData = localStorage.getItem('motorPartsInventory');
            if (savedData) {
                this.products = JSON.parse(savedData);
            }
        }
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if Alpine is loaded
    if (typeof Alpine === 'undefined') {
        console.error('Alpine.js is not loaded');
    }
    
    // Feather icons replacement
    feather.replace();
    
    // Load from local storage if available
    const app = document.querySelector('[x-data="inventoryApp()"]').__x;
    if (app) {
        app.loadFromLocalStorage();
    }
    
    // Save to local storage before unload
    window.addEventListener('beforeunload', function() {
        const app = document.querySelector('[x-data="inventoryApp()"]').__x;
        if (app) {
            app.saveToLocalStorage();
        }
    });

});
