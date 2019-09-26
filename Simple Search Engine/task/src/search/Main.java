package search;


import java.io.*;
import java.util.*;
import java.util.List;

public class Main {
    private String[] data;
    private Map<String, List<Integer>> map = new LinkedHashMap();
    private String query;
    private String strategy;
    private String search;
    boolean isWork = true;
    Scanner input1 = new Scanner(System.in);

    public static void main(String[] args) {

        new Main().start();

    }

    public void start() {
        loadData();
        while (isWork) {
            System.out.println("=== Menu ===\n1. Find a person\n2. Print all people\n0. Exit");
            query = input1.nextLine();
            switch (query) {
                case "1":
                    find();
                    break;
                case "2":
                    printAll();
                    break;
                case "0":
                    System.out.println();
                    System.out.println("Bye!");
                    isWork = false;
                    break;
                default:
                    System.out.println();
                    System.out.println("Incorrect option! Try again.");
                    System.out.println();
                    break;
            }
        }
    }

    public void loadData() {
        try {
            File file = new File("C:\\Users\\Илья\\Desktop\\test.txt");
            LineNumberReader lnr = new LineNumberReader(new FileReader(file));
            int num;
            for (num = 0; lnr.readLine() != null; num++) {
            }
            lnr.close();

            this.data = new String[num];
            BufferedReader reader = new BufferedReader(new FileReader(file));
            for (int i = 0; i < this.data.length; i++) {
                String line;
                if ((line = reader.readLine()) != null) ;
                this.data[i] = line;
            }
            reader.close();
        } catch (IOException e) {
            System.out.println("Error");
        }

        for (int i = 0; i < this.data.length; i++) {
            for (int j = 0; j < this.data[i].split(" ").length; j++) {
                if (!this.map.containsKey(this.data[i].toLowerCase().split(" ")[j])) {
                    ArrayList list = new ArrayList();
                    list.add(i);
                    this.map.put(this.data[i].toLowerCase().split(" ")[j].trim(), list);
                } else {
                    (this.map.get(this.data[i].toLowerCase().split(" ")[j].trim())).add(i);
                }
            }
        }
    }

    public void find() {
        System.out.println();
        System.out.println("Select a matching strategy: ALL, ANY, NONE");
        strategy = input1.nextLine().trim();

        System.out.println();
        System.out.println("Enter a name or email to search all suitable people.");
        search = input1.nextLine().trim().toLowerCase();

        StrategyContext context = new StrategyContext();


        switch (strategy) {
            case "ALL":
                context.setStrategy(new AllStrategy(map, search, data));
                context.find();
                break;
            case "ANY":
                context.setStrategy(new AnyStrategy(map, search, data));
                context.find();
                break;
            case "NONE":
                context.setStrategy(new NoneStrategy(map, search, data));
                context.find();
                break;
        }

    }

    public void printAll() {
        System.out.println();
        System.out.println("=== List of people ===");
        String[] var1 = this.data;
        int var2 = var1.length;

        for (int var3 = 0; var3 < var2; var3++) {
            String info = var1[var3];
            System.out.println(info.trim());
        }

        System.out.println();
    }
}