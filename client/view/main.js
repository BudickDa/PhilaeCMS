Template.frontendLayout.helpers({
    navbaritems: function (bar) {
        return NavbarItems.find({navbar: bar})
    }
});