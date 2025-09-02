# Drowse

Find the best time to sleep and wake based on sleep cycles. Optimize your rest with our sleep cycle calculator.

## Features

- **Sleep Now**: Get optimal wake-up times when you want to sleep immediately
- **Specify Time**: Calculate optimal sleep or wake times based on your preferences
- **Sleep Cycle Optimization**: Based on 90-minute sleep cycles for better rest quality
- **Clean UI**: Minimal and intuitive design inspired by modern web applications

## How It Works

Sleep cycles typically last 90 minutes. Waking up at the end of a cycle helps you feel more refreshed rather than groogy. This app calculates the optimal times by:

1. Adding 15 minutes for the average time it takes to fall asleep
2. Calculating sleep cycles in 90-minute intervals
3. Providing multiple options with recommendations

## Technology Stack

- **Frontend**: React (Preact)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Language**: TypeScript
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/minagishl/drowse.git
cd drowse
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Usage

### Sleep Now Mode

1. Click on "Sleep Now" card
2. Click the "Sleep Now" button
3. View your optimal wake-up times

### Specify Time Mode

1. Click on "Specify Time" card
2. Select either "Wake up time" or "Sleep time" from the dropdown
3. Set your preferred time using the time selector
4. Click "Calculate" to see your results

## Project Structure

```
src/
├── components/
│   ├── SleepResults.tsx    # Results display component
│   ├── TimeSelector.tsx    # Time input component
│   └── UsageModal.tsx      # Usage guide modal
├── utils/
│   └── sleepCalculator.ts  # Sleep cycle calculation logic
├── app.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
