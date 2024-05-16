<template>
    <div class="card">
        <div class="card-header">
            <h3> {{ capitalizeWords(name) }} </h3>
            
            <div class="card-star-icon">
                <span>4.5</span>
                <span class="pi pi-star-fill" style="color: gold"></span>
            </div>
        </div>

        <div class="card-body row">
            <img src="../assets/expresso.jpg" class="col" alt="#">
            
            <div class="card-menu col">
                <div>
                    <h4>Main dishes:</h4>
                    <ul>
                        <li>Grilled Salmon</li>
                        <li>Vegetable Stir-Fry</li>
                        <li>Beef Wellington</li>
                        <li>Chicken Parmesan</li>
                    </ul>
                </div>

                <div>
                    <h4>Contact:</h4>
                    <p> {{ contact }} </p>
                </div>

                <button class="btn btn-success w-50">
                    See more
                </button>
            </div>
        
            <div class="card-description col">
                <h4>Address:</h4>
                <p> {{ address }} </p>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5004393465388!2d-49.23388622469395!3d-25.454959933879564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce517b2fd34af%3A0x9eba470968a1d3f9!2sHot%20Dog%20Expresso%20Move%20Jd.%20das%20Am%C3%A9ricas!5e0!3m2!1spt-BR!2sbr!4v1715631874474!5m2!1spt-BR!2sbr" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import '../styles/RestaurantPage.scss'

    export default {
        name: 'RestaurantCard',
        props: {
            name: String,
            address: String,
            contact: String
        },
        methods : {
            capitalizeWords(name) {
                const words = name.split(' ');

                const capitalizedWords = words.map(word => {
                    if (word.length > 0) {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    } else {
                        return word;
                    }
                });

                return capitalizedWords.join(' ');
            }
        }
    }
</script>