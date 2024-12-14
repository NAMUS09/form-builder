# Quick Form Builder

Welcome to **Quick Form Builder** – a drag-and-drop form builder built with **Next.js**, **ShadCN**, and **React Hook Form**. With this tool, users can easily create dynamic forms and generate the code to integrate them into their applications.

## Features

- **Drag-and-Drop Interface**: Easily create forms with a simple drag-and-drop interface.
- **Code Generation**: Get the generated code for your form that can be used directly in your Next.js or React projects.
- **Customizable Fields**: Add various form fields such as text inputs, checkboxes, radio buttons, and more.
- **React Hook Form Integration**: Seamlessly integrates with React Hook Form for form validation and management.
- **ShadCN UI Components**: Built with ShadCN components for a clean and modern UI experience.

## Demo

Check out the live demo of the Quick Form Builder [here](https://quick-form-builder.vercel.app/).

## Installation

### Prerequisites

- Node.js (version 18.x or higher)
- npm or yarn

### Steps to Set Up Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/NAMUS09/form-builder.git 
   ```
2. Navigate to the project directory:
    
    ```bash
    cd form-builder
    ```
3. Install the dependencies:
    
    ```bash
    npm install
    ```
4. Start the development server:
    
    ```bash
    npm run dev
    ```
5. Open your browser and go to http://localhost:3000 to see the app in action.



## Usage

### 1. Create a New Form
- Start by dragging and dropping form fields from the sidebar onto the form canvas. 
- You can add different types of fields such as text inputs, checkboxes, radio buttons, and more.

### 2. Configure Fields
- Once a field is added to the canvas, you can customize its properties.
  - **Label**: Set the label for the field.
  - **Placeholder**: Add a placeholder for text inputs.
  - **Validation**: Configure validation rules for the field, such as required, minimum length, or custom validations.
  - **Options**: For fields like checkboxes and radio buttons, you can define the options to display.

### 3. Generate Code
- Once you're satisfied with the form layout and configurations, click the **"Show Code"** button.
- The builder will generate the code for your form, including all the necessary components and validation logic using **React Hook Form**.

### 4. Integrate Code
- Copy the generated code and integrate it into your **Next.js** or **React** project.
- You can use the code directly in your components to render the form with all the fields and functionality you configured.


## Contributing

Contributions are welcome! If you would like to contribute to Form Builder, please follow these steps:

1. **Fork the Repository**: Click on the “Fork” button at the top right corner of the repository page.
2. **Create a Branch**: 
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Make Changes**: Implement your feature or fix.
4. **Commit Changes**: 
   ```bash
   git commit -m "Add a feature"
   ```
5. **Push Changes**: 
   ```bash
   git push origin feature/YourFeatureName
   ```
6. **Create a Pull Request**: Go to the original repository and create a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/) - The React framework for production.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for creating custom designs.
- [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation.
  