/*
    Author:   Julie Lewis
    Subject:  Week 8: JS5 - Object Oriented Programming Assignment
*/

class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
    describe() {
        return `${this.name} is a ${this.position}.`;
    }
}

class Group {
    constructor(name) {
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        // Ensure that only instances of Member can be added to the group.
        if (member instanceof Member) {
            this.members.push(member);
        } else {
            // Throw an error if the argument is not a Member instance.
            throw new Error(`You can only add an instance of Member. 
            Argument is not a member: ${member}`);
        }
    }

    describe() {
        return `${this.name} has ${this.members.length} members.`;
    }
}


class Menu {
    constructor() {
        this.groups = [];
        this.selectedGroup = null; // Stores the currently selected group for operations
    }

    start() {
        let selection = this.showMainMenuOptions();
        // Loop until the user selects '0' to exit
        while (selection != '0') { // Compare as string since prompt returns string
            switch (selection) {
                case '1':
                    this.createGroup();
                    break;
                case '2':
                    this.viewGroup();
                    break;
                case '3':
                    this.deleteGroup();
                    break;
                case '4':
                    this.displayGroups(); // Call the displayGroups method
                    break;
                default:
                    // If an invalid option is entered, set selection to '0' to exit
                    selection = '0';
                    alert('Invalid selection. Exiting.'); // Inform user of invalid input
            }
            // After an action, show the main menu options again for the next selection
            if (selection !== '0') { // Only show menu again if not exiting
                selection = this.showMainMenuOptions();
            }
        }
        alert('Goodbye!'); // Final message when exiting
    }

    showMainMenuOptions() {
        // Displays the main menu options to the user and returns their input
        return prompt(`
            0) Exit
            1) Create New Group
            2) View Group
            3) Delete Group
            4) Display All Groups
        `);
    }

    showGroupMenuOptions(groupInfo) {
        // Displays the submenu options for a selected group and returns user input
        return prompt(`
            0) Back
            1) Add Member
            2) Delete Member
            -------------------
            ${groupInfo}
        `);
    }

    createGroup() {
        // Prompts for a new group name and adds a new Group instance to the groups array
        let name = prompt('Enter name for new group:');
        if (name) { // Ensure name is not null or empty string
            this.groups.push(new Group(name));
            alert(`Group "${name}" created!`);
        } else {
            alert('Group name cannot be empty.');
        }
    }

    displayGroups() {
        // Displays all existing groups with their index and member count
        if (this.groups.length === 0) {
            alert('No groups to display.');
            return;
        }

        let groupList = '--- Your Groups ---\n';
        for (let i = 0; i < this.groups.length; i++) {
            groupList += `${i}) ${this.groups[i].describe()}\n`;
        }
        alert(groupList);
    }

    viewGroup() {
        // Allows the user to select and interact with a specific group
        if (this.groups.length === 0) {
            alert('No groups to view. Please create a group first.');
            return;
        }

        let index = prompt('Enter the index of the group you want to view:');
        // Convert index to a number for proper comparison
        index = parseInt(index);

        // Validate the index
        if (index > -1 && index < this.groups.length) {
            this.selectedGroup = this.groups[index]; // Set the selected group

            let memberSelection = ''; // Loop variable for the group menu
            do {
                let description = `Group Name: ${this.selectedGroup.name}\n`; // Corrected: Removed repeated name

                if (this.selectedGroup.members.length === 0) {
                    description += 'No members in this group.\n';
                } else {
                    description += '--- Members ---\n';
                    for (let i = 0; i < this.selectedGroup.members.length; i++) {
                        description += `${i}) ${this.selectedGroup.members[i].name} - ${this.selectedGroup.members[i].position}\n`;
                    }
                }

                memberSelection = this.showGroupMenuOptions(description);

                switch (memberSelection) {
                    case '1':
                        this.addMember();
                        break;
                    case '2':
                        this.deleteMember();
                        break;
                    case '0':
                        // Exit the inner loop, go back to main menu
                        break;
                    default:
                        alert('Invalid selection. Please try again.');
                }
            } while (memberSelection !== '0'); // Continue until '0' is selected
        } else {
            alert('Invalid group index.');
        }
    }

    deleteGroup() {
        // Prompts for a group index and removes it from the groups array
        if (this.groups.length === 0) {
            alert('No groups to delete.');
            return;
        }

        let index = prompt('Enter the index of the group you want to delete:');
        index = parseInt(index); // Convert to number

        if (index > -1 && index < this.groups.length) {
            const deletedGroupName = this.groups[index].name;
            this.groups.splice(index, 1);
            alert(`Group "${deletedGroupName}" deleted!`);
        } else {
            alert('Invalid index. Please enter a valid group index.');
        }
    }

    addMember() {
        // Prompts for member details and adds a new Member instance to the selected group
        if (!this.selectedGroup) {
            alert('No group selected. Please view a group first.');
            return;
        }
        let name = prompt('Enter name for new member:');
        let position = prompt('Enter position for new member:');

        if (name && position) {
            this.selectedGroup.addMember(new Member(name, position)); // Use addMember method for validation
            alert(`Member "${name}" added to "${this.selectedGroup.name}"!`);
        } else {
            alert('Member name and position cannot be empty.');
        }
    }

    deleteMember() {
        // Prompts for a member index and removes it from the selected group's members array
        if (!this.selectedGroup || this.selectedGroup.members.length === 0) {
            alert('No members to delete in this group.');
            return;
        }

        let index = prompt('Enter the index of the member you want to delete:');
        index = parseInt(index); // Convert to number

        if (index > -1 && index < this.selectedGroup.members.length) {
            const deletedMemberName = this.selectedGroup.members[index].name;
            this.selectedGroup.members.splice(index, 1);
            alert(`Member "${deletedMemberName}" deleted from "${this.selectedGroup.name}"!`);
        } else {
            alert('Invalid index. Please enter a valid member index.');
        }
    }
}

// Create a new Menu instance and start the application
let menu = new Menu();
menu.start();