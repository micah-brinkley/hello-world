'use strict';

$(document).ready(function () {

    // Canvas Sample
    const canvas = $("#canvas").get(0);
    const ctx = canvas.getContext("2d");
    let animationHandle;

    const ball = {
        x: 100,
        y: 100,
        vx: 10,
        vy: 10,
        radius: 25,
        color: "blue",
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        },
    };

    function draw() {
        ctx.fillStyle = "rgb(255 255 255 / 30%)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ball.draw();
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy *= 0.99;
        ball.vy += 0.10;

        if (
            ball.y + ball.vy > canvas.height - ball.radius ||
            ball.y + ball.vy < ball.radius
        ) {
            ball.vy = -ball.vy;
        }
        if (
            ball.x + ball.vx > canvas.width - ball.radius ||
            ball.x + ball.vx < ball.radius
        ) {
            ball.vx = -ball.vx;
        }

        animationHandle = window.requestAnimationFrame(draw);
    }
    ball.draw();

    // React Components
    const e = React.createElement;
    class AnimationToggleButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = { animated: false };
        }

        render() {
            if (this.state.animated) {
                animationHandle = window.requestAnimationFrame(draw);
            } else {
                window.cancelAnimationFrame(animationHandle);
            }

            return e(
                'button',
                { onClick: () => this.setState({ animated: !this.state.animated }) },
                this.state.animated ? 'Stop Animation' : 'Start Animation'
            );
        }
    }
    
    const root = ReactDOM.createRoot($('#animation_button_container').get(0));
    root.render(e(AnimationToggleButton));
});
