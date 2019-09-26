package search;

import java.util.*;

public class AllStrategy implements StrategyInterface {

    private Map<String, List<Integer>> map;
    private String search;
    private String data[];

    public AllStrategy(Map<String, List<Integer>> map, String search, String[] data) {
        this.map = map;
        this.search = search;
        this.data = data;
    }

    @Override
    public void find() {
        int size = search.split(" ").length;
        int num = 0;
        int searchNum = -1;
        List<Integer> searchList = map.get(search.split(" ")[0]); // 0
        if(size > 1 && searchList != null) {
                for (int s : searchList) {
                    if(searchNum != -1)
                        break;
                    for (int i = 0; i < size; i++) {
                        if(data[s].toLowerCase().contains(search.split(" ")[i])) {
                            num++;
                            if(num == size) {
                                searchNum = s;
                                break;
                            }
                        }
                    }
                }
                if(searchNum != -1) {
                    System.out.println();
                    System.out.println("1 person found:");
                    System.out.println(data[searchNum].trim());
                    System.out.println();
                }
                else{
                    System.out.println();
                    System.out.println("No matching people found.");
                    System.out.println();
                }

        }
        else if (size == 1 && searchList != null){
            System.out.println();
            System.out.println(searchList.size() + " persons found:");
            for (int s : searchList) {
                System.out.println(data[s].trim());
            }
            System.out.println();
        }
        else {
            System.out.println();
            System.out.println("No matching people found.");
            System.out.println();
        }

    }
}
