// Repeatable component
var Repeatable = React.createClass({
    displayName: "Repeatable",
    getInitialState: function () {
        // The initial state is a copy of the passed-in children elements
        return {
            repeatedItems: [new Array().concat(this.props.children)]
        };
    },
    handleClick: function (cmd) {
        var newItems = this.state.repeatedItems; // The list is added to or removed from based on the user controls

        if (cmd == "inc" && newItems.length < this.props.maxRepeat) {
            newItems.push(new Array().concat(this.props.children));
        } else if (cmd == "dec" && newItems.length > this.props.minRepeat) {
            newItems.splice(-1, 1);
        } // The list is updated and the UI re-rendered

        this.setState({
            repeatedItems: newItems
        });
    },
    render: function () {
        var titleRepeat = this.props.titleRepeat; // Since the children are an array of elements, loop through twice
        // This is brittle in handling children with nested elements

        return /*#__PURE__*/ React.createElement(
            "div",
            null,
            this.state.repeatedItems.map(function (itemGroup, i) {
                return /*#__PURE__*/ React.createElement(
                    "fieldset", {
                        key: i + 1
                    },
                    /*#__PURE__*/
                    React.createElement("legend", null, titleRepeat),
                    itemGroup.map(function (item) {
                        return React.cloneElement(item, {
                            id: item.props.id + "-" + (i + 1)
                        });
                    })
                );
            }),
            /*#__PURE__*/
            React.createElement(
                "a", {
                    onClick: this.handleClick.bind(this, "dec"),
                    className: "button tiny repeat-control"
                },
                "Remove"
            ),
            /*#__PURE__*/
            React.createElement(
                "a", {
                    onClick: this.handleClick.bind(this, "inc"),
                    className: "button tiny repeat-control"
                },
                "Add"
            )
        );
    }
}); // Dropdown component

var Dropdown = React.createClass({
    displayName: "Dropdown",
    render: function () {
        return /*#__PURE__*/ React.createElement(
            "label", {
                htmlFor: this.props.id
            },
            this.props.title,
            /*#__PURE__*/
            React.createElement(
                "select", {
                    id: this.props.id,
                    name: this.props.id,
                    onChange: this.props.handleChange
                },
                this.props.options.map(function (option, i) {
                    return /*#__PURE__*/ React.createElement(
                        "option", {
                            val: option,
                            key: i
                        },
                        option
                    );
                })
            )
        );
    }
}); // InputGroup component

var InputGroup = React.createClass({
    displayName: "InputGroup",
    render: function () {
        return /*#__PURE__*/ React.createElement(
            "label", {
                htmlFor: this.props.id
            },
            this.props.title,
            /*#__PURE__*/
            React.createElement("input", {
                id: this.props.id,
                name: this.props.id,
                type: this.props.type
            })
        );
    }
}); // Form component

var Form = React.createClass({
    displayName: "Form",
    getInitialState: function () {
        return {
            otherDiet: false
        };
    },
    handleChangeDiet: function (event) {
        this.setState({
            otherDiet: event.target.value == "Other"
        });
    },
    render: function () {
        return /*#__PURE__*/ React.createElement(
            "form",
            null,
            /*#__PURE__*/
            React.createElement(
                "fieldset",
                null,
                /*#__PURE__*/
                React.createElement("legend", null, "RSVP"),
                /*#__PURE__*/
                React.createElement(InputGroup, {
                    id: "name",
                    type: "text",
                    title: "Name"
                }),
                /*#__PURE__*/
                React.createElement(InputGroup, {
                    id: "email",
                    type: "email",
                    title: "Email Address"
                }),
                /*#__PURE__*/
                React.createElement(Dropdown, {
                    id: "diet",
                    type: "select",
                    title: "Dietary Considerations",
                    options: DIETARY_OPTIONS,
                    handleChange: this.handleChangeDiet
                }),
                this.state.otherDiet ?
                /*#__PURE__*/
                React.createElement(InputGroup, {
                    id: "otherDiet",
                    type: "text",
                    title: "Please Specify"
                }) :
                null,
                /*#__PURE__*/
                React.createElement(
                    Repeatable, {
                        minRepeat: 1,
                        maxRepeat: 5,
                        titleRepeat: "Invitee"
                    },
                    /*#__PURE__*/
                    React.createElement(InputGroup, {
                        id: "inviteeName",
                        type: "text",
                        title: "Invite Name",
                        key: "inviteeName"
                    }),
                    /*#__PURE__*/
                    React.createElement(InputGroup, {
                        id: "inviteeEmail",
                        type: "email",
                        title: "Invitee Email",
                        key: "inviteeEmail"
                    })
                ),
                /*#__PURE__*/
                React.createElement("input", {
                    type: "submit",
                    className: "button"
                })
            )
        );
    }
});
var DIETARY_OPTIONS = ["None", "Gluten-free", "Nut-free", "Vegan", "Other"];
React.render(
    /*#__PURE__*/
    React.createElement(Form, null),
    document.getElementById("myForm")
);
