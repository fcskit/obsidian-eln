let PromptModal = class extends obsidian.Modal {
    title = "Input";
    value = "";
    submitted = false;
    placeholder = "Type text here";
    author = "";
    projectName = "";
    sampleName = "";
    operators = [];
    sampleTypes = [];

    constructor(opts = {}) {
        super(app);
        Object.assign(this, opts);
    }

    onOpen() {
        const { TextComponent, ButtonComponent, SelectComponent } = obsidian;
        const { titleEl, contentEl, title } = this;

        titleEl.setText(title);

        // Author input
        const authorInput = new TextComponent(contentEl);
        authorInput.inputEl.style.width = "100%";
        authorInput.setPlaceholder("Author");
        authorInput.setValue(this.author);
        authorInput.onChange((value) => { this.author = value });

        // Project name input
        const projectNameInput = new TextComponent(contentEl);
        projectNameInput.inputEl.style.width = "100%";
        projectNameInput.setPlaceholder("Project Name");
        projectNameInput.setValue(this.projectName);
        projectNameInput.onChange((value) => { this.projectName = value });

        // Sample name input
        const sampleNameInput = new TextComponent(contentEl);
        sampleNameInput.inputEl.style.width = "100%";
        sampleNameInput.setPlaceholder("Sample Name");
        sampleNameInput.setValue(this.sampleName);
        sampleNameInput.onChange((value) => { this.sampleName = value });

        // Operators drop-down
        const operatorsSelect = new SelectComponent(contentEl);
        operatorsSelect.addOptions(this.operators);
        operatorsSelect.onChange((value) => { this.selectedOperator = value });

        // Sample types drop-down
        const sampleTypesSelect = new SelectComponent(contentEl);
        sampleTypesSelect.addOptions(this.sampleTypes);
        sampleTypesSelect.onChange((value) => { this.selectedSampleType = value });

        // Confirm button
        const confirmButton = new ButtonComponent(contentEl);
        confirmButton.setButtonText('Submit');
        confirmButton.setCta();
        confirmButton.onClick(() => {
            this.submitted = true;
            this.close();
        });
    }

    onClose() {
        if (this.resolve) {
            this.resolve(this.submitted ? {
                author: this.author,
                projectName: this.projectName,
                sampleName: this.sampleName,
                selectedOperator: this.selectedOperator,
                selectedSampleType: this.selectedSampleType
            } : null);
        }
    }

    enterCallback(event) {
        if (event.key === "Enter") {
            this.submitted = true;
            event.preventDefault();
            this.close();
        }
    }

    async prompt(opts = {}) {
        const { PromptModal } = this;
        return new Promise((resolve) => {
            const modal = new PromptModal({
                ...opts,
                resolve,
            });
            modal.open();
        });
    }
};

// Function to prompt the modal and return the input values
async function promptInput(opts = {}) {
    return new Promise((resolve) => {
        const modal = new PromptModal({
            ...opts,
            resolve,
        });
        modal.open();
    });
}

// Example usage
// promptInput({
//     title: "Enter your input",
//     operators: { "op1": "Operator 1", "op2": "Operator 2" },
//     sampleTypes: { "type1": "Type 1", "type2": "Type 2" }
// }).then((inputValues) => {
//     console.log("Input values:", inputValues);
// });

module.exports = promptInput;