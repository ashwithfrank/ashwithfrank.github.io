import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class TOH {

    static JTextArea resultArea;

    public static void main(String[] args) {

        JFrame frame = new JFrame("Tower of Hanoi");
        frame.setSize(400, 500);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout(10, 10));

        // Top text
        JLabel title = new JLabel("Tower of Hanoi", JLabel.CENTER);
        title.setFont(new Font("Arial", Font.BOLD, 22));
        frame.add(title, BorderLayout.NORTH);

        // Center panel
        JPanel centerPanel = new JPanel();
        centerPanel.setLayout(new BorderLayout(5, 5));

        JTextField input = new JTextField();
        input.setFont(new Font("Arial", Font.PLAIN, 18));
        input.setHorizontalAlignment(JTextField.CENTER);
        centerPanel.add(input, BorderLayout.NORTH);

        resultArea = new JTextArea();
        resultArea.setEditable(false);
        resultArea.setFont(new Font("Monospaced", Font.PLAIN, 14));

        JScrollPane scroll = new JScrollPane(resultArea);
        centerPanel.add(scroll, BorderLayout.CENTER);

        frame.add(centerPanel, BorderLayout.CENTER);

        // Button
        JButton btn = new JButton("Solve");
        frame.add(btn, BorderLayout.SOUTH);

        // Button click logic
        btn.addActionListener(e -> {
            resultArea.setText("");
            try {
                int n = Integer.parseInt(input.getText());
                int totalMoves = (int) Math.pow(2, n) - 1;
                resultArea.append("Total moves: " + totalMoves + "\n\n");
                solveHanoi(n, "BEG", "AUX", "END");
            } catch (Exception ex) {
                resultArea.setText("Enter a valid number!");
            }
        });

        frame.setVisible(true);
    }

    static void solveHanoi(int n, String from, String aux, String to) {
        if (n == 1) {
            resultArea.append("Move disk 1 from " + from + " to " + to + "\n");
            return;
        }
        solveHanoi(n - 1, from, to, aux);
        resultArea.append("Move disk " + n + " from " + from + " to " + to + "\n");
        solveHanoi(n - 1, aux, from, to);
    }
}