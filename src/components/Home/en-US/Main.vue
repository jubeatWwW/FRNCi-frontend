<template>
    <div>
        <Board></Board>
        <Introduction></Introduction>
        <Events></Events>
        <Feature></Feature>
        <Memories></Memories>
        <Cooperation></Cooperation>
    </div>
</template>
<script>
import Board from './Board';
import Introduction from './Introduction';
import Events from './Events';
import Products from './Products';
import Schedule from './Schedule';
import Memories from './Memories';
import Feature from './Feature';
import Cooperation from './Cooperation';

export default {
    components: {
        Board,
        Introduction,
        Events,
        Products,
        Feature,
        Schedule,
        Memories,
        Cooperation,
    },
};
</script>

<style>
section {
    margin-bottom: 0;
}

@media (max-width: 575.98px) {
    .md-layout {
        display: grid !important;
    }
}
</style>