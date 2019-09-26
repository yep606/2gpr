package search;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class AnyStrategy implements StrategyInterface {

    private Map<String, List<Integer>> map;
    private String search;
    private String data[];


    public AnyStrategy(Map<String, List<Integer>> map, String search, String[] data) {
        this.map = map;
        this.search = search;
        this.data = data;
    }


    @Override
    public void find() {
        int count = 0;
        List<String> result = new ArrayList<>();
        for (int i = 0; i < search.split(" ").length; i++) {
            List<Integer> list = map.get(search.split(" ")[i]);
            if (list != null) {
                for (int n : list) {
                    if (!result.contains(data[n])) {
                        result.add(data[n]);
                        count++;
                    }
                }
            }
        }

        if (count > 0) {
            System.out.println();
            System.out.println(count + " persons found:");
            for (String s : result
            ) {
                System.out.println(s.trim());
            }

            System.out.println();
        } else {
            System.out.println("No matching people found.");
            System.out.println();
        }

    }
}

