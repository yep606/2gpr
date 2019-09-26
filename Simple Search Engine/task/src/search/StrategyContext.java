package search;

public class StrategyContext {

    private StrategyInterface strategy;


    public void setStrategy(StrategyInterface strategyInterface) {
        this.strategy = strategyInterface;
    }

    public void find() {
        strategy.find();
    }
}
